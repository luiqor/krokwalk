import { HTTPError } from "shared";

declare global {
	namespace jest {
		interface Matchers<R> {
			toBeHTTPError(expectedStatus: number, expectedMessage: string): R;
			toBeWithinDistanceThreshold(threshold: number): R;
			toHaveValidUserPlaceStructure(): R;
			toBeValidCoordinates(): R;
			toMatchVisitStatus(expectedStatus: string): R;
		}
	}
}

// Custom matchers
expect.extend({
	toBeHTTPError(
		received: any,
		expectedStatus: number,
		expectedMessage: string
	) {
		const pass =
			received instanceof HTTPError &&
			received.status === expectedStatus &&
			received.message === expectedMessage;
		return {
			message: () =>
				`expected ${received} to be HTTPError with status ${expectedStatus} and message ${expectedMessage}`,
			pass,
		};
	},

	toBeWithinDistanceThreshold(received: any, threshold: number) {
		const pass = typeof received === "number" && received <= threshold;
		return {
			message: () =>
				`expected ${received} to be within distance threshold ${threshold}`,
			pass,
		};
	},

	toHaveValidUserPlaceStructure(received: any) {
		const hasRequiredFields =
			received &&
			(typeof received.userId === "string" ||
				(received.items && Array.isArray(received.items))) &&
			(received.items
				? received.items.every(
						(item: any) =>
							typeof item.placeId === "string" && item.visitStatus !== undefined
					)
				: typeof received.placeId === "string");
		return {
			message: () => `expected ${received} to have valid user place structure`,
			pass: hasRequiredFields,
		};
	},

	toBeValidCoordinates(received: any) {
		const isValid =
			received &&
			typeof received.lat === "number" &&
			typeof received.lng === "number" &&
			received.lat >= -90 &&
			received.lat <= 90 &&
			received.lng >= -180 &&
			received.lng <= 180;
		return {
			message: () => `expected ${received} to have valid coordinates`,
			pass: isValid,
		};
	},

	toMatchVisitStatus(received: any, expectedStatus: string) {
		const pass = received && received.visitStatus === expectedStatus;
		return {
			message: () =>
				`expected ${received} to have visit status ${expectedStatus}`,
			pass,
		};
	},
});

export {};
