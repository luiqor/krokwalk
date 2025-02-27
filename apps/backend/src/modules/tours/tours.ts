import { TourController } from "./tour.controller";
import { TourModel } from "./tour.model";
import { TourRepository } from "./tour.repository";
import { TourService } from "./tour.service";

const tourRepository = new TourRepository(TourModel);
const tourService = new TourService(tourRepository);
const tourController = new TourController(tourService);

const tourRouter = tourController.router;

export { tourRouter, tourService, type TourService };
export { type TourEntity } from "./tour.entity";
