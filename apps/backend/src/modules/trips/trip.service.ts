import type { GeoApify } from "~/libs/modules/geo-apify/geo-apify";
import type { PlaceService, PlacesGetAllQueryParams } from "../places/places";

class TripService {
  private geoApify: GeoApify;
  private placesService: PlaceService;

  public constructor(geoApify: GeoApify, placesService: PlaceService) {
    this.geoApify = geoApify;
    this.placesService = placesService;
  }

  public async getTimeMatrix({
    startingPoint,
    destinationPoint,
    tags,
    tours,
  }: {
    startingPoint: string;
    destinationPoint: string;
  } & PlacesGetAllQueryParams): Promise<{
    minimumTime: number;
  }> {
    const startingPointCoordinates = startingPoint.split(",").map(Number);
    const destinationPointCoordinates = destinationPoint.split(",").map(Number);
    const places = await this.placesService.getAll({ tags, tours });

    const placesCoordinates = places.items.map((place) => [
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
    const summsWithIndexes = startingPointRow
      .slice(1, -1)
      .map((target, index) => ({
        index,
        sum: target.time + lastRow[index].time,
      }));

    console.log(summsWithIndexes);

    const closestPlacesTravelTimes = summsWithIndexes
      .sort((a, b) => a.sum - b.sum)
      .slice(0, 3);

    console.log(closestPlacesTravelTimes);

    const averageTimeToClosestPlaces =
      closestPlacesTravelTimes.reduce((sum, item) => sum + item.sum, 0) /
      closestPlacesTravelTimes.length;

    const closestPlacesIndices = closestPlacesTravelTimes.map(
      (item) => item.index
    );

    const travelTimesBetweenClosestPlaces: number[] = [];

    for (const [i, fromIndex] of closestPlacesIndices.entries()) {
      for (const toIndex of closestPlacesIndices.slice(i + 1)) {
        const travelTime = timeMatrix[fromIndex][toIndex].time;
        travelTimesBetweenClosestPlaces.push(travelTime);
      }
    }

    const averageTravelTimeBetweenClosestPlaces =
      travelTimesBetweenClosestPlaces.reduce((sum, time) => sum + time, 0) /
      travelTimesBetweenClosestPlaces.length;

    return {
      minimumTime:
        averageTimeToClosestPlaces + averageTravelTimeBetweenClosestPlaces,
    };
  }
}

export { TripService };
