import { VisitStatus, HTTPCode, HTTPErrorMessage } from "shared";
import { UserPlacesService } from "~/modules/user-places/user-places.service";
import { UserPlacesRepository } from "~/modules/user-places/user-places.repository";
import { PlaceService } from "~/modules/places/place.service";
import { UserPlacesModel } from "~/modules/user-places/user-places.model";
import { UserPlacesEntity } from "~/modules/user-places/user-places.entity";
import "./jest-custom-matchers";

// Usage of data generators to create fake data
const generateUserId = (): string =>
	`user-${Math.random().toString(36).substr(2, 9)}`;

const generatePlaceId = (): string =>
	`place-${Math.random().toString(36).substr(2, 9)}`;

const generateCoordinates = () => ({
	lat: Number((Math.random() * 180 - 90).toFixed(6)),
	lng: Number((Math.random() * 360 - 180).toFixed(6)),
});

const generatePlace = (overrides?: Partial<any>) => ({
	id: generatePlaceId(),
	title: `Test Place ${Math.random().toString(36).substr(2, 5)}`,
	lat: 50.4501,
	lng: 30.5234,
	...overrides,
});

const generateUserPlace = (overrides?: Partial<any>) => ({
	id: Math.random().toString(36).substr(2, 9),
	userId: generateUserId(),
	placeId: generatePlaceId(),
	visitStatus: VisitStatus.MARKED,
	visitedAt: null,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	...overrides,
});

const generateUserPlaceEntity = (data?: Partial<any>) => {
	const userPlace = generateUserPlace(data);
	return {
		toUserObject: jest.fn().mockReturnValue({
			id: userPlace.id,
			placeId: userPlace.placeId,
			visitStatus: userPlace.visitStatus,
			visitedAt: userPlace.visitedAt,
		}),
		toObject: jest.fn().mockReturnValue(userPlace),
		userId: userPlace.userId,
		placeId: userPlace.placeId,
		visitStatus: userPlace.visitStatus,
		visitedAt: userPlace.visitedAt,
	};
};

const generateMultipleUserPlaces = (count: number) =>
	Array.from({ length: count }, () => generateUserPlaceEntity());

const generateMultiplePlaceIds = (count: number) =>
	Array.from({ length: count }, () => generatePlaceId());

describe("UserPlacesService Unit Tests", () => {
	let service: UserPlacesService;
	let mockRepository: jest.Mocked<UserPlacesRepository>;
	let mockPlaceService: jest.Mocked<PlaceService>;
	let consoleSpy: jest.SpyInstance;
	let dateNowSpy: jest.SpyInstance;

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

		service = new UserPlacesService(mockRepository, mockPlaceService);

		consoleSpy = jest.spyOn(console, "log").mockImplementation();
		// Mock native Date methods
		dateNowSpy = jest
			.spyOn(Date.prototype, "toISOString")
			.mockReturnValue("2024-01-01T00:00:00.000Z");
	});

	afterEach(() => {
		jest.clearAllMocks();
		consoleSpy.mockRestore();
		dateNowSpy.mockRestore();
	});

	describe("getAll", () => {
		// Async/await approach
		it("should return user places when authorized", async () => {
			const userId = generateUserId();
			const entities = generateMultipleUserPlaces(3);
			mockRepository.getAll.mockResolvedValue(entities as any);

			const result = await service.getAll({ userId, currentUserId: userId });

			expect(result).toHaveValidUserPlaceStructure();
			expect(result.userId).toBe(userId);
			expect(result.items).toHaveLength(3);
			expect(mockRepository.getAll).toHaveBeenCalledWith(userId);
		});

		// Callback approach
		it("should handle empty results", (done) => {
			const userId = generateUserId();
			mockRepository.getAll.mockResolvedValue([]);

			service
				.getAll({ userId, currentUserId: userId })
				.then((result) => {
					expect(result).toHaveValidUserPlaceStructure();
					expect(result.items).toHaveLength(0);
					done();
				})
				.catch(done);
		});

		// Async matchers
		it("should reject with proper error for unauthorized access", async () => {
			const userId = generateUserId();
			const differentUserId = generateUserId();

			await expect(
				service.getAll({ userId, currentUserId: differentUserId })
			).rejects.toBeHTTPError(
				HTTPCode.FORBIDDEN,
				HTTPErrorMessage.AUTH.FORBIDDEN
			);
		});

		it("should handle repository errors gracefully", async () => {
			const userId = generateUserId();
			const error = new Error("Database connection failed");
			mockRepository.getAll.mockRejectedValue(error);

			await expect(
				service.getAll({ userId, currentUserId: userId })
			).rejects.toThrow("Database connection failed");
		});
	});

	describe("getManyByIds", () => {
		// Input series testing
		it.each([
			[[], []],
			[[generatePlaceId()], [generateUserPlaceEntity()]],
			[generateMultiplePlaceIds(2), generateMultipleUserPlaces(2)],
			[generateMultiplePlaceIds(5), generateMultipleUserPlaces(5)],
		])(
			"should handle different input series: %p places",
			async (placeIds, expectedEntities) => {
				const userId = generateUserId();
				mockRepository.getManyByIds.mockResolvedValue(expectedEntities as any);

				const result = await service.getManyByIds(userId, placeIds);

				expect(result).toHaveLength(expectedEntities.length);
				expect(mockRepository.getManyByIds).toHaveBeenCalledWith(
					userId,
					placeIds
				);
			}
		);

		// Async matchers
		it("should return properly formatted user places", async () => {
			const userId = generateUserId();
			const placeIds = generateMultiplePlaceIds(3);
			const entities = generateMultipleUserPlaces(3);
			mockRepository.getManyByIds.mockResolvedValue(entities as any);

			await expect(
				service.getManyByIds(userId, placeIds)
			).resolves.toHaveLength(3);
		});

		// Callback approach with error handling
		it("should handle repository errors in callback style", (done) => {
			const userId = generateUserId();
			const placeIds = generateMultiplePlaceIds(1);
			const error = new Error("Repository error");
			mockRepository.getManyByIds.mockRejectedValue(error);

			service
				.getManyByIds(userId, placeIds)
				.then(() => {
					done(new Error("Should have thrown"));
				})
				.catch((err) => {
					expect(err).toEqual(error);
					done();
				});
		});
	});

	describe("updateVisitStatus", () => {
		// Async/await approach
		it("should create new user place when it doesn't exist", async () => {
			const userId = generateUserId();
			const placeId = generatePlaceId();
			const visitStatus = VisitStatus.MARKED;
			const place = generatePlace({ id: placeId });
			const newEntity = generateUserPlaceEntity({
				userId,
				placeId,
				visitStatus,
			});

			mockRepository.getById.mockResolvedValue(null);
			mockPlaceService.getById.mockResolvedValue(place as any);
			mockRepository.create.mockResolvedValue(newEntity as any);

			const initializeSpy = jest
				.spyOn(UserPlacesEntity, "initializeNew")
				.mockReturnValue(newEntity as any);

			const result = await service.updateVisitStatus({
				userId,
				placeId,
				visitStatus,
			});

			expect(result).toMatchVisitStatus(visitStatus);
			expect(mockRepository.create).toHaveBeenCalledWith(newEntity);
			expect(initializeSpy).toHaveBeenCalledWith({
				visitStatus,
				userId,
				placeId,
			});

			initializeSpy.mockRestore();
		});

		// Input series
		it.each([
			[VisitStatus.MARKED, VisitStatus.MARKED],
			[VisitStatus.CONFIRMED, VisitStatus.CONFIRMED],
			[VisitStatus.UNVISITED, VisitStatus.UNVISITED],
		])(
			"should update existing user place with status %s",
			async (inputStatus, expectedStatus) => {
				const userId = generateUserId();
				const placeId = generatePlaceId();
				const existingEntity = generateUserPlaceEntity({ userId, placeId });
				const updatedEntity = generateUserPlaceEntity({
					userId,
					placeId,
					visitStatus: expectedStatus,
				});

				mockRepository.getById.mockResolvedValue(existingEntity as any);
				mockRepository.updateStatus.mockResolvedValue(updatedEntity as any);

				const result = await service.updateVisitStatus({
					userId,
					placeId,
					visitStatus: inputStatus,
				});

				expect(result).toMatchVisitStatus(expectedStatus);
				expect(mockRepository.updateStatus).toHaveBeenCalledWith(
					userId,
					placeId,
					inputStatus
				);
			}
		);

		// Async matchers
		it("should auto-confirm when marking already visited place", async () => {
			const userId = generateUserId();
			const placeId = generatePlaceId();
			const visitStatus = VisitStatus.MARKED;
			const existingEntity = generateUserPlaceEntity({
				userId,
				placeId,
				visitedAt: "2024-01-01T00:00:00.000Z",
			});
			const updatedEntity = generateUserPlaceEntity({
				userId,
				placeId,
				visitStatus: VisitStatus.CONFIRMED,
			});

			mockRepository.getById.mockResolvedValue(existingEntity as any);
			mockRepository.updateStatus.mockResolvedValue(updatedEntity as any);

			await expect(
				service.updateVisitStatus({ userId, placeId, visitStatus })
			).resolves.toMatchVisitStatus(VisitStatus.CONFIRMED);
		});

		// Callback approach
		it("should reject unauthorized users via callback", (done) => {
			const userId = generateUserId();
			const differentUserId = generateUserId();
			const placeId = generatePlaceId();
			const existingEntity = generateUserPlaceEntity({
				userId: differentUserId,
				placeId,
			});

			mockRepository.getById.mockResolvedValue(existingEntity as any);

			service
				.updateVisitStatus({
					userId,
					placeId,
					visitStatus: VisitStatus.MARKED,
				})
				.then(() => {
					done(new Error("Should have thrown authorization error"));
				})
				.catch((error) => {
					expect(error).toBeHTTPError(
						HTTPCode.FORBIDDEN,
						HTTPErrorMessage.AUTH.FORBIDDEN
					);
					done();
				});
		});
	});

	describe("confirmPlaceVisit", () => {
		// Async/await
		it("should confirm visit when user is within distance threshold", async () => {
			const userId = generateUserId();
			const placeId = generatePlaceId();
			const userCoords = { lat: 50.4501, lng: 30.5234 };
			const place = generatePlace({ id: placeId, ...userCoords });
			const existingEntity = generateUserPlaceEntity({ userId, placeId });
			const updatedEntity = generateUserPlaceEntity({
				userId,
				placeId,
				visitStatus: VisitStatus.CONFIRMED,
			});

			mockRepository.getById.mockResolvedValue(existingEntity as any);
			mockPlaceService.getById.mockResolvedValue(place as any);
			mockRepository.updateStatus.mockResolvedValue(updatedEntity as any);

			const result = await service.confirmPlaceVisit({
				userId,
				placeId,
				...userCoords,
			});

			expect(result).toMatchVisitStatus(VisitStatus.CONFIRMED);
			expect(mockRepository.updateStatus).toHaveBeenCalledWith(
				userId,
				placeId,
				VisitStatus.CONFIRMED
			);
		});

		// Success cases: should confirm visit
		it.each([
			[50.4501, 30.5234, 50.4501, 30.5234], // Same location
			[50.4501, 30.5234, 50.4502, 30.5235], // Close location
		])(
			"should confirm visit for user coords (%f, %f) and place coords (%f, %f)",
			async (userLat, userLng, placeLat, placeLng) => {
				const userId = generateUserId();
				const placeId = generatePlaceId();
				const place = generatePlace({
					id: placeId,
					lat: placeLat,
					lng: placeLng,
				});
				const existingEntity = generateUserPlaceEntity({ userId, placeId });
				const updatedEntity = generateUserPlaceEntity({
					userId,
					placeId,
					visitStatus: VisitStatus.CONFIRMED,
				});

				mockRepository.getById.mockResolvedValue(existingEntity as any);
				mockPlaceService.getById.mockResolvedValue(place as any);
				mockRepository.updateStatus.mockResolvedValue(updatedEntity as any);

				await expect(
					service.confirmPlaceVisit({
						userId,
						placeId,
						lat: userLat,
						lng: userLng,
					})
				).resolves.toMatchVisitStatus(VisitStatus.CONFIRMED);
			}
		);

		// Failure cases: should reject as too far
		it.each([
			[50.4501, 30.5234, 50.46, 30.54], // Far location
			[50.4501, 30.5234, 51.0, 31.0], // Very far location
		])(
			"should reject visit for user coords (%f, %f) and place coords (%f, %f) as too far",
			async (userLat, userLng, placeLat, placeLng) => {
				const userId = generateUserId();
				const placeId = generatePlaceId();
				const place = generatePlace({
					id: placeId,
					lat: placeLat,
					lng: placeLng,
				});
				const existingEntity = generateUserPlaceEntity({ userId, placeId });
				const updatedEntity = generateUserPlaceEntity({
					userId,
					placeId,
					visitStatus: VisitStatus.CONFIRMED,
				});

				mockRepository.getById.mockResolvedValue(existingEntity as any);
				mockPlaceService.getById.mockResolvedValue(place as any);
				mockRepository.updateStatus.mockResolvedValue(updatedEntity as any);

				await expect(
					service.confirmPlaceVisit({
						userId,
						placeId,
						lat: userLat,
						lng: userLng,
					})
				).rejects.toBeHTTPError(
					HTTPCode.BAD_REQUEST,
					HTTPErrorMessage.PLACE.TOO_FAR
				);
			}
		);

		// Callback approach
		it("should create new confirmed visit when user place doesn't exist", (done) => {
			const userId = generateUserId();
			const placeId = generatePlaceId();
			const userCoords = { lat: 50.4501, lng: 30.5234 };
			const place = generatePlace({ id: placeId, ...userCoords });
			const newEntity = generateUserPlaceEntity({
				userId,
				placeId,
				visitStatus: VisitStatus.CONFIRMED,
			});

			mockRepository.getById.mockResolvedValue(null);
			mockPlaceService.getById.mockResolvedValue(place as any);
			mockRepository.create.mockResolvedValue(newEntity as any);

			const initializeSpy = jest
				.spyOn(UserPlacesEntity, "initializeNew")
				.mockReturnValue(newEntity as any);

			service
				.confirmPlaceVisit({ userId, placeId, ...userCoords })
				.then((result) => {
					expect(result).toMatchVisitStatus(VisitStatus.CONFIRMED);
					expect(mockRepository.create).toHaveBeenCalledWith(newEntity);
					expect(initializeSpy).toHaveBeenCalledWith({
						visitStatus: VisitStatus.CONFIRMED,
						userId,
						placeId,
						visitedAt: "2024-01-01T00:00:00.000Z",
					});
					initializeSpy.mockRestore();
					done();
				})
				.catch(done);
		});

		// Async matchers
		it("should reject unauthorized users with async matcher", async () => {
			const userId = generateUserId();
			const differentUserId = generateUserId();
			const placeId = generatePlaceId();
			const userCoords = { lat: 50.4501, lng: 30.5234 };
			const place = generatePlace({ id: placeId, ...userCoords });
			const existingEntity = generateUserPlaceEntity({
				userId: differentUserId,
				placeId,
			});

			mockRepository.getById.mockResolvedValue(existingEntity as any);
			mockPlaceService.getById.mockResolvedValue(place as any);

			await expect(
				service.confirmPlaceVisit({ userId, placeId, ...userCoords })
			).rejects.toBeHTTPError(
				HTTPCode.FORBIDDEN,
				HTTPErrorMessage.AUTH.FORBIDDEN
			);
		});
	});

	// Testing private methods with different approaches
	describe("Distance calculation", () => {
		it("should calculate distance correctly", async () => {
			const getDistanceInMeters = (service as any).getDistanceInMeters.bind(
				service
			);

			const distance = getDistanceInMeters(50.4501, 30.5234, 50.4501, 30.5234);
			expect(distance).toBeWithinDistanceThreshold(1);
		});

		it.each([
			[50.4501, 30.5234, 50.4501, 30.5234, 1], // Same coordinates
			[50.4501, 30.5234, 50.4502, 30.5235, 200], // Close coordinates
			[50.4501, 30.5234, 50.46, 30.54, 2000], // Far coordinates
			[0, 0, 0, 0, 1], // Origin coordinates
			[-50.4501, -30.5234, -50.4501, -30.5234, 1], // Negative coordinates
		])(
			"should calculate distance for coordinates (%f, %f) to (%f, %f) within %f meters",
			(lat1, lng1, lat2, lng2, expectedThreshold) => {
				const getDistanceInMeters = (service as any).getDistanceInMeters.bind(
					service
				);

				const distance = getDistanceInMeters(lat1, lng1, lat2, lng2);
				expect(distance).toBeWithinDistanceThreshold(expectedThreshold);
			}
		);

		// Callback approach for distance validation
		it("should validate coordinate boundaries", (done) => {
			const invalidCoords = { lat: 91, lng: 181 };
			try {
				expect(invalidCoords).not.toBeValidCoordinates();
				done();
			} catch (error) {
				done(error);
			}
		});

		it("should accept valid coordinate boundaries", (done) => {
			const validCoords = generateCoordinates();
			try {
				expect(validCoords).toBeValidCoordinates();
				done();
			} catch (error) {
				done(error);
			}
		});
	});

	describe("Error handling", () => {
		it("should throw an error when repository fails", async () => {
			const userId = generateUserId();
			const error = new Error("Database connection failed");
			mockRepository.getAll.mockRejectedValue(error);

			try {
				await service.getAll({ userId, currentUserId: userId });
				fail("Expected error was not thrown");
			} catch (err) {
				expect(err).toBe(error);
				expect((err as Error).message).toBe("Database connection failed");
			}
		});

		it("should handle place service error", (done) => {
			const userId = generateUserId();
			const placeId = generatePlaceId();
			const error = new Error("Place service unavailable");

			mockRepository.getById.mockResolvedValue(null);
			mockPlaceService.getById.mockRejectedValue(error);

			service
				.updateVisitStatus({
					userId,
					placeId,
					visitStatus: VisitStatus.MARKED,
				})
				.then(() => {
					done(new Error("Should have thrown"));
				})
				.catch((err) => {
					expect(err.message).toBe("Place service unavailable");
					done();
				});
		});

		it("should handle multiple concurrent errors", async () => {
			const userId = generateUserId();
			const placeIds = generateMultiplePlaceIds(3);
			const error = new Error("Concurrent access error");
			mockRepository.getManyByIds.mockRejectedValue(error);

			await expect(service.getManyByIds(userId, placeIds)).rejects.toThrow(
				"Concurrent access error"
			);
		});
	});

	describe("Date mocking scenarios", () => {
		it("should use mocked Date in entity creation", async () => {
			const userId = generateUserId();
			const placeId = generatePlaceId();
			const place = generatePlace({ id: placeId });
			const newEntity = generateUserPlaceEntity({
				userId,
				placeId,
				visitStatus: VisitStatus.CONFIRMED,
			});

			mockRepository.getById.mockResolvedValue(null);
			mockPlaceService.getById.mockResolvedValue(place as any);
			mockRepository.create.mockResolvedValue(newEntity as any);

			const initializeSpy = jest
				.spyOn(UserPlacesEntity, "initializeNew")
				.mockReturnValue(newEntity as any);

			await service.confirmPlaceVisit({
				userId,
				placeId,
				lat: 50.4501,
				lng: 30.5234,
			});

			expect(initializeSpy).toHaveBeenCalledWith({
				visitStatus: VisitStatus.CONFIRMED,
				userId,
				placeId,
				visitedAt: "2024-01-01T00:00:00.000Z",
			});

			initializeSpy.mockRestore();
		});

		// Test Date mocking with different scenarios
		it.each([
			["2024-01-01T00:00:00.000Z", VisitStatus.CONFIRMED],
			["2024-06-15T12:30:00.000Z", VisitStatus.CONFIRMED],
			["2024-12-31T23:59:59.000Z", VisitStatus.CONFIRMED],
		])(
			"should handle different date formats: %s",
			async (mockedDate, expectedStatus) => {
				dateNowSpy.mockReturnValue(mockedDate);

				const userId = generateUserId();
				const placeId = generatePlaceId();
				const place = generatePlace({ id: placeId });
				const newEntity = generateUserPlaceEntity({
					userId,
					placeId,
					visitStatus: expectedStatus,
				});

				mockRepository.getById.mockResolvedValue(null);
				mockPlaceService.getById.mockResolvedValue(place as any);
				mockRepository.create.mockResolvedValue(newEntity as any);

				const initializeSpy = jest
					.spyOn(UserPlacesEntity, "initializeNew")
					.mockReturnValue(newEntity as any);

				await service.confirmPlaceVisit({
					userId,
					placeId,
					lat: 50.4501,
					lng: 30.5234,
				});

				expect(initializeSpy).toHaveBeenCalledWith({
					visitStatus: expectedStatus,
					userId,
					placeId,
					visitedAt: mockedDate,
				});

				initializeSpy.mockRestore();
			}
		);
	});
});
