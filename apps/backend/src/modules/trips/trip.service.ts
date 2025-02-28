import { HTTPCode, HTTPError, HTTPErrorMessage } from "~/libs/http/http";
import type { GeoApify } from "~/libs/modules/geo-apify/geo-apify";
import type { PlaceService, PlacesGetAllQueryParams } from "../places/places";
import type { TagService } from "../tags/tags";
import type { TourService } from "../tours/tours";

import type { GetWalkTimeDto } from "./libs/types/types";
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

    return places.items.filter((place) => {
      return (
        place.lat >= minLat &&
        place.lat <= maxLat &&
        place.lng >= minLng &&
        place.lng <= maxLng
      );
    });
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
    timeMatrix: { time: number }[][];
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

    const startingPointIndex = 0;
    const destinationRowIndex = timeMatrixResponse.sources.length - 1;
    const startingPointRow = timeMatrix[startingPointIndex];
    const lastRow = timeMatrix[destinationRowIndex];

    return {
      timeMatrix,
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
    const placesOnTheWay = this.filterClosestPlaces({
      startingPointCoordinates,
      destinationPointCoordinates,
      places: await this.placeService.getAll({ tags, tours }),
    });

    if (placesOnTheWay.length < MINIMUM_NUMBER_OF_PLACES_REQUIRED) {
      throw new HTTPError({
        status: HTTPCode.BAD_REQUEST,
        message: HTTPErrorMessage.TRIPS.NOT_ENOUGH_PLACES,
      });
    }

    const { timeMatrix, startingPointRow, lastRow } = await this.getTimeMatrix({
      startingPointCoordinates,
      destinationPointCoordinates,
      filteredPlaces: placesOnTheWay,
    });
    const startToEndWalkDuration = startingPointRow
      .slice(1, -1)
      .map((target, index) => ({
        index,
        sum: target.time + lastRow[index].time,
      }));

    const closestPlacesTravelTimes = startToEndWalkDuration
      .sort((a, b) => a.sum - b.sum)
      .slice(0, AVERAGE_NUMBER_OF_PLACES_TO_VISIT);

    const { sums: closestPlacesSums, indices: closestPlacesIndices } =
      this.destructureSumsAndIndicies(closestPlacesTravelTimes);

    const averageTimeToClosestPlaces = calculateAverage(closestPlacesSums);

    const travelTimesBetweenClosestPlaces = this.getTravelTimesBetweenPlaces({
      placesIndices: closestPlacesIndices,
      durationMatrix: timeMatrix,
    });

    const accumulatedTimeBetweenClosestPlaces =
      travelTimesBetweenClosestPlaces.reduce((sum, time) => sum + time, 0);

    const selectedTags = await this.tagService.getManyBuSlugs(
      ensureArray(tags)
    );
    const selectedTours = await this.tourService.getManyBySlugs(
      ensureArray(tours)
    );

    return {
      minimumWalkSeconds:
        averageTimeToClosestPlaces + accumulatedTimeBetweenClosestPlaces,
      tags: selectedTags.items,
      tours: selectedTours.items,
      startingPoint,
      destinationPoint,
    };
  }
}

export { TripService };
