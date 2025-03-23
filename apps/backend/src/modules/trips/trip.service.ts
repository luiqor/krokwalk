import { HTTPCode, HTTPError, HTTPErrorMessage } from "~/libs/http/http";
import type { GeoApify } from "~/libs/modules/geo-apify/geo-apify";
import type { PlaceService, PlacesGetAllQueryParams } from "../places/places";
import type { TagService } from "../tags/tags";
import type { TourService } from "../tours/tours";

import type {
	CreateTripBodyDto,
	CreateTripPlace,
	CreateTripResDto,
	GetWalkTimeDto,
} from "./libs/types/types";
import { ensureArray } from "~/libs/helpers/helpers";

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
};

class TripService {
	private geoApify: GeoApify;
	private placeService: PlaceService;
	private tagService: TagService;
	private tourService: TourService;

	public constructor({
		geoApify,
		placeService,
		tagService,
		tourService,
	}: Constructor) {
		this.geoApify = geoApify;
		this.placeService = placeService;
		this.tagService = tagService;
		this.tourService = tourService;
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
		const { timeMatrix, startingPointRow, lastRow } =
			await this.getTimeMatrixOfClosestPlaces({
				startingPointCoordinates,
				destinationPointCoordinates,
				tags,
				tours,
			});

		const walkDurationsStartToPlaceToEnd = startingPointRow
			.slice(1, -1)
			.map((target, index) => ({
				index,
				sum: target.time + lastRow[index].time,
			}));

		const closestPlacesTravelTimes = walkDurationsStartToPlaceToEnd
			.sort((a, b) => a.sum - b.sum)
			.slice(0, AVERAGE_NUMBER_OF_PLACES_TO_VISIT);

		const { sums: closestPlacesSums, indices: closestPlacesIndices } =
			this.destructureSumsAndIndicies(closestPlacesTravelTimes);

		const averageTimeStartToPlaceToEnd = calculateAverage(closestPlacesSums);

		const travelTimesBetweenClosestPlaces = this.getTravelTimesBetweenPlaces({
			placesIndices: closestPlacesIndices,
			durationMatrix: timeMatrix,
		});

		const accumulatedTimeBetweenClosestPlaces =
			travelTimesBetweenClosestPlaces.reduce((sum, time) => sum + time, 0);

		const selectedTags = tags
			? await this.tagService.getManyBuSlugs(ensureArray(tags))
			: await this.tagService.getAll();

		const selectedTours = tours
			? await this.tourService.getManyBySlugs(ensureArray(tours))
			: await this.tourService.getAll();

		return {
			minimumWalkSeconds:
				averageTimeStartToPlaceToEnd + accumulatedTimeBetweenClosestPlaces,
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
	}: CreateTripBodyDto): Promise<CreateTripResDto> {
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
			return {
				path: [startIndex, endIndex],
				totalTime: directTime,
				visitedPlaces: [],
				startingPoint: startingPointCoordinates,
				destinationPoint: destinationPointCoordinates,
			};
		}

		const coordinates: [number, number][] = placeIndices.map((index) => [
			sources[index].original_location[0],
			sources[index].original_location[1],
		]);

		// Fetch all place details in a single call
		const placesResponse =
			await this.placeService.getManyByCoordinates(coordinates);

		// Prepare places with their details
		const places = placesResponse.map((place, index) => ({
			id: place.id,
			title: place.title,
			index: placeIndices[index],
			tags: place.tags.map((tag) => tag.slug),
			tours: place.tours.map((tour) => tour.slug),
			lat: place.lat,
			lng: place.lng,
			priority: 0,
		}));

		// TODO: Implement: Find the optimal route
		const result = this.findOptimalTripRoute({
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

		console.log(result);

		return {
			path: result.path,
			totalTime: result.totalTime,
			visitedPlaces: result.visitedPlaces,
			startingPoint: startingPointCoordinates,
			destinationPoint: destinationPointCoordinates,
		};
	}

	private findOptimalTripRoute({
		timeMatrix,
		startIndex,
		endIndex,
		places,
		priorityPlaces,
		maximumWalkSeconds,
	}: {
		timeMatrix: { time: number }[][];
		startIndex: number;
		endIndex: number;
		places: CreateTripPlace[];
		priorityPlaces: { tags?: string[]; tours?: string[] };
		maximumWalkSeconds: number;
	}): {
		path: number[];
		totalTime: number;
		visitedPlaces: CreateTripPlace[];
	} {
		// Step 1: Create initial path using greedy approach
		// This path will likely be too long, which is expected
		const initialPath = this.createInitialPath(
			timeMatrix,
			startIndex,
			endIndex
		);

		// If there are no intermediate places, return direct path
		if (initialPath.length <= 2) {
			return {
				path: initialPath,
				totalTime: timeMatrix[startIndex][endIndex].time,
				visitedPlaces: [],
			};
		}

		// Step 2: Assign priorities to places based on tags and tours
		this.assignPriorities(places, priorityPlaces);

		// Step 3: Apply knapsack algorithm to select optimal places
		// The knapsack will select the most valuable places while staying within maximumWalkSeconds
		const result = this.applyKnapsackAlgorithm(
			initialPath,
			timeMatrix,
			places,
			maximumWalkSeconds
		);

		// Create final visited places list
		const visitedPlaces = result.path
			.filter((index) => index !== startIndex && index !== endIndex)
			.map((index) => {
				// Find the place with the corresponding index
				return places.find((place) => place.index === index);
			})
			.filter((place) => place !== undefined) as CreateTripPlace[];

		return {
			path: result.path,
			totalTime: result.totalTime,
			visitedPlaces,
		};
	}

	/**
	 * Creates an initial path from start to end using a greedy approach
	 * This path will include all intermediate places and will likely exceed the time limit
	 */
	private createInitialPath(
		timeMatrix: { time: number }[][],
		startIndex: number,
		endIndex: number
	): number[] {
		const visited = new Set<number>([startIndex]);
		const path = [startIndex];
		let currentIndex = startIndex;

		// Continue until we've visited all nodes or reached the end
		while (visited.size < timeMatrix.length) {
			let nextIndex = -1;
			let minTime = Infinity;

			// Find the unvisited node with the minimum time from the current node
			for (let i = 0; i < timeMatrix.length; i++) {
				if (!visited.has(i) && timeMatrix[currentIndex][i].time < minTime) {
					minTime = timeMatrix[currentIndex][i].time;
					nextIndex = i;
				}
			}

			// If no next node found or it's the end node and we haven't visited all others,
			// choose the end node only if we've visited at least half of the nodes
			if (
				nextIndex === -1 ||
				(nextIndex === endIndex && visited.size < timeMatrix.length / 2)
			) {
				// Find the next best node that's not the end
				nextIndex = -1;
				minTime = Infinity;
				for (let i = 0; i < timeMatrix.length; i++) {
					if (
						!visited.has(i) &&
						i !== endIndex &&
						timeMatrix[currentIndex][i].time < minTime
					) {
						minTime = timeMatrix[currentIndex][i].time;
						nextIndex = i;
					}
				}

				// If still no node found, add end index and break
				if (nextIndex === -1) {
					if (!visited.has(endIndex)) {
						path.push(endIndex);
						visited.add(endIndex);
					}
					break;
				}
			}

			// Add the next node to the path
			path.push(nextIndex);
			visited.add(nextIndex);
			currentIndex = nextIndex;

			// If we've reached the end and visited most nodes, we're done
			if (nextIndex === endIndex && visited.size > timeMatrix.length * 0.8) {
				break;
			}
		}

		// If end node is not the last in path, ensure it is
		if (path[path.length - 1] !== endIndex) {
			if (visited.has(endIndex)) {
				// Remove endIndex from its current position
				const endIndexPosition = path.indexOf(endIndex);
				if (endIndexPosition !== -1) {
					path.splice(endIndexPosition, 1);
				}
			}
			path.push(endIndex);
		}

		return path;
	}

	/**
	 * Assigns priority values to places based on their tags and tours
	 */
	private assignPriorities(
		places: CreateTripPlace[],
		priorityPlaces: { tags?: string[]; tours?: string[] }
	): void {
		const { tags = [], tours = [] } = priorityPlaces;

		places.forEach((place) => {
			let priority = 0;

			// Calculate priority based on tags
			place.tags.forEach((tag) => {
				const tagIndex = tags.indexOf(tag);
				if (tagIndex !== -1) {
					// Higher priority for tags with lower indices
					priority += (tags.length - tagIndex) * 2; // Give more weight to tags
				}
			});

			// Calculate priority based on tours
			place.tours.forEach((tour) => {
				const tourIndex = tours.indexOf(tour);
				if (tourIndex !== -1) {
					// Higher priority for tours with lower indices
					priority += (tours.length - tourIndex) * 3; // Give even more weight to tours
				}
			});

			// Add base priority to ensure places with no matching tags/tours still have some value
			place.priority = priority + 1;
		});
	}

	/**
	 * Applies knapsack algorithm to select optimal places within time constraint
	 */
	private applyKnapsackAlgorithm(
		initialPath: number[],
		timeMatrix: { time: number }[][],
		places: CreateTripPlace[],
		maximumWalkSeconds: number
	): {
		path: number[];
		totalTime: number;
	} {
		const startIndex = initialPath[0];
		const endIndex = initialPath[initialPath.length - 1];

		// Get all intermediate places from the initial path
		const intermediatePlaces = initialPath
			.filter((index) => index !== startIndex && index !== endIndex)
			.map((index) => {
				const place = places.find((p) => p.index === index);
				return {
					index,
					priority: place ? place.priority : 0,
				};
			});

		// If no intermediate places, return direct path
		if (intermediatePlaces.length === 0) {
			return {
				path: [startIndex, endIndex],
				totalTime: timeMatrix[startIndex][endIndex].time,
			};
		}

		// Evaluate all possible combinations of places, starting with the full set
		const bestPath = this.findBestPath(
			startIndex,
			endIndex,
			intermediatePlaces,
			timeMatrix,
			maximumWalkSeconds
		);

		return bestPath;
	}

	/**
	 * Finds the best path that maximizes priority within the time constraint
	 */
	private findBestPath(
		startIndex: number,
		endIndex: number,
		intermediatePlaces: { index: number; priority: number }[],
		timeMatrix: { time: number }[][],
		maximumWalkSeconds: number
	): {
		path: number[];
		totalTime: number;
	} {
		// Create items for knapsack algorithm
		const items = intermediatePlaces.map((place, i) => ({
			...place,
			originalIndex: i, // Keep track of the original position
		}));

		const n = items.length;
		// Convert time to integer milliseconds for more precise calculations
		const timeLimit = Math.floor(maximumWalkSeconds * 1000);

		// Map of dp[i][time] = maximum priority achievable with first i items within time limit
		const dp: Map<string, number> = new Map();
		// Map of selected[i][time] = items selected to achieve dp[i][time]
		const selected: Map<string, boolean[]> = new Map();

		// Initialize with 0 items
		dp.set(`0_0`, 0);
		selected.set(`0_0`, new Array(n).fill(false));

		// Fill the dp table using bitmask to represent selected items
		for (let mask = 1; mask < 1 << n; mask++) {
			// Get indices of selected places in this mask
			const selectedIndices = [];
			for (let i = 0; i < n; i++) {
				if ((mask & (1 << i)) !== 0) {
					selectedIndices.push(i);
				}
			}

			// Calculate time for this combination
			const path = [
				startIndex,
				...selectedIndices.map((i) => items[i].index),
				endIndex,
			];
			let time = 0;
			for (let i = 0; i < path.length - 1; i++) {
				time += timeMatrix[path[i]][path[i + 1]].time * 1000; // Convert to milliseconds
			}

			// Calculate total priority
			const priority = selectedIndices.reduce(
				(sum, i) => sum + items[i].priority,
				0
			);

			// Update dp if this combination is feasible and better
			if (time <= timeLimit) {
				const key = `${n}_${time}`;
				if (!dp.has(key) || priority > dp.get(key)!) {
					dp.set(key, priority);

					// Mark selected items
					const selection = new Array(n).fill(false);
					selectedIndices.forEach((i) => {
						selection[i] = true;
					});
					selected.set(key, selection);
				}
			}
		}

		// Find the best feasible combination
		let bestPriority = 0;
		let bestKey = `0_0`;

		for (const [key, priority] of dp.entries()) {
			if (priority > bestPriority) {
				bestPriority = priority;
				bestKey = key;
			}
		}

		// Reconstruct the path from the selected items
		const bestSelection = selected.get(bestKey) || new Array(n).fill(false);
		const selectedPlaces = items.filter((_, i) => bestSelection[i]);

		// Sort selected places based on their original order in the path
		selectedPlaces.sort((a, b) => a.originalIndex - b.originalIndex);

		const finalPath = [
			startIndex,
			...selectedPlaces.map((p) => p.index),
			endIndex,
		];

		// Calculate final time
		let totalTime = 0;
		for (let i = 0; i < finalPath.length - 1; i++) {
			totalTime += timeMatrix[finalPath[i]][finalPath[i + 1]].time;
		}

		return {
			path: finalPath,
			totalTime,
		};
	}
}

export { TripService };
