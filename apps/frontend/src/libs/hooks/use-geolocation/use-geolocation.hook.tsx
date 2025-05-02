import { useState, useEffect } from "react";

type GeolocationState = {
	latitude: number | null;
	longitude: number | null;
	error: string | null;
};

const useGeolocation = () => {
	const [location, setLocation] = useState<GeolocationState>({
		latitude: null,
		longitude: null,
		error: null,
	});

	useEffect(() => {
		if (!navigator.geolocation) {
			setLocation((prev) => ({
				...prev,
				error: "Geolocation is disabled in this browser.",
			}));
			return;
		}

		const handleSuccess = (position: GeolocationPosition) => {
			setLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				error: null,
			});
		};

		const handleError = (error: GeolocationPositionError) => {
			setLocation((prev) => ({
				...prev,
				error: error.message,
			}));
		};

		navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
	}, []);

	return {
		latitude: location.latitude,
		longitude: location.longitude,
		error: location.error,
		hasError: !!location.error,
	};
};

export { useGeolocation };
