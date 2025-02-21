import type { Osrm } from "~/libs/modules/osrm/osrm";
import type { PlaceService, PlacesGetAllQueryParams } from "../places/places";

class TripService {
  private osrm: Osrm;
  private placesService: PlaceService;

  public constructor(osrm: Osrm, placesService: PlaceService) {
    this.osrm = osrm;
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
    const places = await this.placesService.getAll({ tags, tours });

    const placesCoordinates = places.items.map(
      (place) => `${place.lat},${place.lng}`
    );

    console.log(placesCoordinates);

    const coordinates = [startingPoint, ...placesCoordinates, destinationPoint];

    const timeMatrixResponse = await this.osrm.getTimeMatrix(coordinates);
    const timeMatrix = timeMatrixResponse.durations;
    console.log(timeMatrixResponse);

    const startingPointIndex = 0;
    const destinationRowIndex = timeMatrixResponse.sources.length - 1;
    const startingPointRow = timeMatrix[startingPointIndex];
    const lastRow = timeMatrix[destinationRowIndex];
    const summsWithIndexes = startingPointRow
      .slice(1, -1)
      .map((time, index) => ({
        index,
        sum: time + lastRow[index],
      }));

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

    for (let i = 0; i < closestPlacesIndices.length; i++) {
      for (let j = i + 1; j < closestPlacesIndices.length; j++) {
        const fromIndex = closestPlacesIndices[i];
        const toIndex = closestPlacesIndices[j];
        const travelTime = timeMatrix[fromIndex][toIndex];

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
