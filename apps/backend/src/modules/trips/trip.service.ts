import { AchievementDto, VisitStatus } from "shared";

import { HTTPCode, HTTPError, HTTPErrorMessage } from "~/libs/http/http";
import type { GeoApify } from "~/libs/modules/geo-apify/geo-apify";
import type { PlaceService, PlacesGetAllQueryParams } from "../places/places";
import type { TagService } from "../tags/tags";
import type { TourService } from "../tours/tours";
import type { UserService } from "../users/users";
import {
	AchievementEvent,
	type AchievementService,
} from "../achievements/achievements";
import { ensureArray } from "~/libs/helpers/helpers";
import type { UserPlacesService } from "../user-places/user-places";

import type {
	CreateTripBodyDto,
	CreateTripResDto,
	GetWalkTimeDto,
} from "./libs/types/types";
import type { TripRouteService } from "./trip-route.service";

const AVERAGE_NUMBER_OF_PLACES_TO_VISIT = 3;

const MINIMUM_NUMBER_OF_PLACES_REQUIRED = 1;

const calculateAverage = (items: number[]): number => {
	return items.reduce((sum, item) => sum + item, 0) / items.length;
};

type Constructor = {
	geoApify: GeoApify;
	placeService: PlaceService;
	tagService: TagService;
	tourService: TourService;
	tripRouteService: TripRouteService;
	userPlacesService: UserPlacesService;
	userService: UserService;
	achievementService: AchievementService;
};

type CompleteTripRequestDto = {
	placeIds: string[];
};

type CompleteTripResponseDto = {
	newAchievements: AchievementDto[];
};

class TripService {
	private geoApify: GeoApify;
	private placeService: PlaceService;
	private tagService: TagService;
	private tourService: TourService;
	private tripRouteService: TripRouteService;
	private userPlacesService: UserPlacesService;
	private userService: UserService;
	private achievementService: AchievementService;

	public constructor({
		geoApify,
		placeService,
		tagService,
		tourService,
		tripRouteService,
		userPlacesService,
		userService,
		achievementService,
	}: Constructor) {
		this.geoApify = geoApify;
		this.placeService = placeService;
		this.tagService = tagService;
		this.tourService = tourService;
		this.tripRouteService = tripRouteService;
		this.userPlacesService = userPlacesService;
		this.userService = userService;
		this.achievementService = achievementService;
	}

	private filterClosestPlaces({
		startingPointCoordinates,
		destinationPointCoordinates,
		places,
	}: {
		startingPointCoordinates: number[];
		destinationPointCoordinates: number[];
		places: { items: { lat: number; lng: number }[] };
	}): { lat: number; lng: number }[] {
		const distanceBufferInDegrees = 0.05;
		const minLat =
			Math.min(startingPointCoordinates[0], destinationPointCoordinates[0]) -
			distanceBufferInDegrees;
		const maxLat =
			Math.max(startingPointCoordinates[0], destinationPointCoordinates[0]) +
			distanceBufferInDegrees;
		const minLng =
			Math.min(startingPointCoordinates[1], destinationPointCoordinates[1]) -
			distanceBufferInDegrees;
		const maxLng =
			Math.max(startingPointCoordinates[1], destinationPointCoordinates[1]) +
			distanceBufferInDegrees;

		const placesOnTheWay = places.items.filter((place) => {
			return (
				place.lat >= minLat &&
				place.lat <= maxLat &&
				place.lng >= minLng &&
				place.lng <= maxLng
			);
		});

		if (placesOnTheWay.length < MINIMUM_NUMBER_OF_PLACES_REQUIRED) {
			throw new HTTPError({
				status: HTTPCode.BAD_REQUEST,
				message: HTTPErrorMessage.TRIPS.NOT_ENOUGH_PLACES,
			});
		}

		return placesOnTheWay;
	}

	private async getTimeMatrix({
		startingPointCoordinates,
		destinationPointCoordinates,
		filteredPlaces,
	}: {
		startingPointCoordinates: number[];
		destinationPointCoordinates: number[];
		filteredPlaces: { lat: number; lng: number }[];
	}): Promise<{
		timeMatrix: { time: number; distance: number }[][];
		sources: { original_location: [number, number] }[];
		startingPointRow: { time: number }[];
		lastRow: { time: number }[];
	}> {
		const placesCoordinates = filteredPlaces.map((place) => [
			place.lat,
			place.lng,
		]);

		const coordinates = [
			startingPointCoordinates,
			...placesCoordinates,
			destinationPointCoordinates,
		];

		const timeMatrixResponse = await this.geoApify.getTimeMatrix(coordinates);
		const timeMatrix = timeMatrixResponse.sources_to_targets;
		const sources = timeMatrixResponse.sources;

		const startingPointIndex = 0;
		const destinationRowIndex = timeMatrixResponse.sources.length - 1;
		const startingPointRow = timeMatrix[startingPointIndex];
		const lastRow = timeMatrix[destinationRowIndex];

		return {
			timeMatrix,
			sources,
			startingPointRow,
			lastRow,
		};
	}

	private getTravelTimesBetweenPlaces({
		placesIndices: closestPlacesIndices,
		durationMatrix: timeMatrix,
	}: {
		placesIndices: number[];
		durationMatrix: { time: number }[][];
	}): number[] {
		const travelTimesBetweenClosestPlaces: number[] = [];

		for (const [i, sourceIndex] of closestPlacesIndices.entries()) {
			for (const destinationIndex of closestPlacesIndices.slice(i + 1)) {
				const travelTime = timeMatrix[sourceIndex][destinationIndex].time;
				travelTimesBetweenClosestPlaces.push(travelTime);
			}
		}

		return travelTimesBetweenClosestPlaces;
	}

	private destructureSumsAndIndicies(
		places: { index: number; sum: number }[]
	): { sums: number[]; indices: number[] } {
		const sums = [];
		const indices = [];

		for (const item of places) {
			sums.push(item.sum);
			indices.push(item.index);
		}

		return { sums, indices };
	}

	private async getTimeMatrixOfClosestPlaces({
		startingPointCoordinates,
		destinationPointCoordinates,
		tags,
		tours,
	}: {
		startingPointCoordinates: number[];
		destinationPointCoordinates: number[];
	} & PlacesGetAllQueryParams): Promise<
		ReturnType<TripService["getTimeMatrix"]>
	> {
		const placesOnTheWay = this.filterClosestPlaces({
			startingPointCoordinates,
			destinationPointCoordinates,
			places: await this.placeService.getAll({ tags, tours }),
		});

		return await this.getTimeMatrix({
			startingPointCoordinates,
			destinationPointCoordinates,
			filteredPlaces: placesOnTheWay,
		});
	}

	public async getWalkTime({
		startingPoint,
		destinationPoint,
		tags,
		tours,
	}: {
		startingPoint: string;
		destinationPoint: string;
	} & PlacesGetAllQueryParams): Promise<GetWalkTimeDto> {
		const startingPointCoordinates = startingPoint.split(",").map(Number);
		const destinationPointCoordinates = destinationPoint.split(",").map(Number);
		const { startingPointRow, lastRow } =
			await this.getTimeMatrixOfClosestPlaces({
				startingPointCoordinates,
				destinationPointCoordinates,
				tags,
				tours,
			});

		const lastRowOnlyPlaces = lastRow.slice(1, -1);

		const walkDurationsStartToPlaceToEnd = startingPointRow
			.slice(1, -1)
			.map((target, index) => ({
				index,
				sum: target.time + lastRowOnlyPlaces[index].time,
			}));

		const closestPlacesTravelTimes = walkDurationsStartToPlaceToEnd
			.sort((a, b) => a.sum - b.sum)
			.slice(0, AVERAGE_NUMBER_OF_PLACES_TO_VISIT);

		const { sums: closestPlacesSums } = this.destructureSumsAndIndicies(
			closestPlacesTravelTimes
		);

		const averageTimeStartToPlaceToEnd = calculateAverage(closestPlacesSums);

		const selectedTags = tags
			? await this.tagService.getManyBuSlugs(ensureArray(tags))
			: await this.tagService.getAll();

		const selectedTours = tours
			? await this.tourService.getManyBySlugs(ensureArray(tours))
			: await this.tourService.getAll();

		return {
			minimumWalkSeconds: averageTimeStartToPlaceToEnd,
			tags: selectedTags.items,
			tours: selectedTours.items,
			startingPoint,
			destinationPoint,
		};
	}

	public async createTrip({
		startingPoint,
		destinationPoint,
		filteredTags,
		filteredTours,
		maximumWalkSeconds,
		prioritizedTags,
		prioritizedTours,
		userId,
	}: CreateTripBodyDto & { userId: string | null }): Promise<CreateTripResDto> {
		const startingPointCoordinates: [number, number] = [
			startingPoint.latitude,
			startingPoint.longitude,
		];
		const destinationPointCoordinates: [number, number] = [
			destinationPoint.latitude,
			destinationPoint.longitude,
		];

		const { timeMatrix, sources } = await this.getTimeMatrixOfClosestPlaces({
			startingPointCoordinates,
			destinationPointCoordinates,
			tags: filteredTags,
			tours: filteredTours,
		});

		const startIndex = 0;
		const endIndex = timeMatrix.length - 1;
		const directTime = timeMatrix[startIndex][endIndex].time;

		if (directTime > maximumWalkSeconds) {
			throw new HTTPError({
				status: HTTPCode.BAD_REQUEST,
				message: HTTPErrorMessage.TRIPS.INVALID_WALK_DURATION,
			});
		}

		// Extract place indices from the time matrix
		const placeIndices = Array.from({ length: endIndex - 1 }, (_, i) => i + 1);

		// Handle the case when there are no intermediate places
		if (placeIndices.length === 0) {
			throw new HTTPError({
				status: HTTPCode.NOT_FOUND,
				message: HTTPErrorMessage.TRIPS.TRIP_BETWEEN_POINTS_NOT_FOUND,
			});
		}

		const coordinates: [number, number][] = placeIndices.map((index) => [
			sources[index].original_location[0],
			sources[index].original_location[1],
		]);

		// Fetch all place details in a single call
		const placesResponse = await this.placeService.getManyByCoordinates(
			coordinates,
			userId
		);

		// Prepare places with their details
		const places = placesResponse.map((place, index) => ({
			id: place.id,
			title: place.title,
			index: placeIndices[index],
			tags: place.tags.map((tag) => tag.slug),
			tours: place.tours.map((tour) => tour.slug),
			lat: place.lat,
			lng: place.lng,
			thumbnailLink: place.thumbnailLink,
			priority: 0,
			visitedAt: place.visitedAt,
			visitStatus: place.visitStatus,
		}));

		const result = this.tripRouteService.findTripRoute({
			timeMatrix,
			startIndex,
			endIndex,
			places,
			priorityPlaces: {
				tags: prioritizedTags,
				tours: prioritizedTours,
			},
			maximumWalkSeconds,
		});

		return {
			path: result.path,
			totalTime: result.totalTime,
			visitedPlaces: result.visitedPlaces,
			startingPoint: startingPointCoordinates,
			destinationPoint: destinationPointCoordinates,
			userId: userId ?? null,
		};
	}

	public async completeTrip({
		placeIds,
		userId,
	}: CompleteTripRequestDto & {
		userId: string | null;
	}): Promise<CompleteTripResponseDto> {
		if (!userId) {
			throw new HTTPError({
				status: HTTPCode.UNAUTHORIZED,
				message: HTTPErrorMessage.AUTH.UNAUTHORIZED,
			});
		}

		const userPlaces = await this.userPlacesService.getManyByIds(
			userId,
			placeIds
		);

		if (placeIds.length !== userPlaces.length) {
			const notExistingPlaces = placeIds.filter(
				(placeId) => !userPlaces.some((place) => place.id === placeId)
			);

			throw new HTTPError({
				status: HTTPCode.BAD_REQUEST,
				message: `${HTTPErrorMessage.NOT_FOUND}. Places ${notExistingPlaces.join(
					", "
				)} don't exist`,
			});
		}

		const confirmedPlaces = userPlaces.filter(
			(place) => place.visitStatus === VisitStatus.CONFIRMED
		);

		if (confirmedPlaces.length !== placeIds.length) {
			const notConfirmedPlaces = placeIds.filter(
				(placeId) => !confirmedPlaces.some((place) => place.id === placeId)
			);

			throw new HTTPError({
				status: HTTPCode.BAD_REQUEST,
				message: `Places ${notConfirmedPlaces.join(", ")} are not confirmed.`,
			});
		}

		const placeAchievement =
			await this.achievementService.getAchievementByEvent({
				achievementEvent: AchievementEvent.VISIT_PLACE,
				targetCount: confirmedPlaces.length,
			});

		if (!placeAchievement) {
			throw new HTTPError({
				status: HTTPCode.NOT_FOUND,
				message: HTTPErrorMessage.ACHIEVEMENTS.NOT_FOUND,
			});
		}

		// TODO: Check if the user already has this exact achievement. If so - send empty array

		const { achievements } = await this.userService.addAchievement({
			id: userId,
			achievementId: placeAchievement.id,
		});

		const placesAchievement = achievements[0];

		console.log(`newAchievements: ${achievements.join(", ")}`);

		return {
			newAchievements: placesAchievement ? [placesAchievement] : [],
		};
	}
}

export { TripService };
