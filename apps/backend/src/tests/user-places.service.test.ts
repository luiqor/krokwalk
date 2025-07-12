import { HTTPError, VisitStatus, HTTPCode, HTTPErrorMessage } from "shared";
import { UserPlacesService } from "~/modules/user-places/user-places.service";
import { UserPlacesRepository } from "~/modules/user-places/user-places.repository";
import { PlaceService } from "~/modules/places/place.service";
import { UserPlacesModel } from "~/modules/user-places/user-places.model";
import "./jest-custom-matchers";

describe("UserPlacesService", () => {
	let service: UserPlacesService;
	let mockRepository: jest.Mocked<UserPlacesRepository>;
	let mockPlaceService: jest.Mocked<PlaceService>;
	let mockEntity: {
		toUserObject: jest.Mock;
		toObject: jest.Mock;
	};

	beforeEach(() => {
		mockRepository = {
			getAll: jest.fn(),
			getById: jest.fn(),
			getManyByIds: jest.fn(),
			create: jest.fn(),
			updateStatus: jest.fn(),
			model: UserPlacesModel,
		} as unknown as jest.Mocked<UserPlacesRepository>;

		mockPlaceService = {
			getById: jest.fn(),
		} as unknown as jest.Mocked<PlaceService>;

		mockEntity = {
			toUserObject: jest.fn(),
			toObject: jest.fn(),
		};

		service = new UserPlacesService(mockRepository, mockPlaceService);
	});

	it("should be successfully instantiated", () => {
		expect(service).toBeInstanceOf(UserPlacesService);
	});
});
