import { useEffect, useState } from "react";

const useTrackingGeolocationPermission = () => {
	const [isGeolocationEnabled, setIsGeolocationEnabled] =
		useState<boolean>(false);

	useEffect(() => {
		let watcher: number;

		const checkGeolocation = () => {
			if (!navigator.geolocation) {
				setIsGeolocationEnabled(false);
				return;
			}

			watcher = navigator.geolocation.watchPosition(
				() => setIsGeolocationEnabled(true),
				() => setIsGeolocationEnabled(false),
				{ enableHighAccuracy: false, timeout: 10 }
			);
		};

		checkGeolocation();

		return () => {
			if (watcher) navigator.geolocation.clearWatch(watcher);
		};
	}, []);

	const setGeolocationDisabled = () => {
		setIsGeolocationEnabled(false);
	};

	return { isGeolocationEnabled, setGeolocationDisabled };
};

export { useTrackingGeolocationPermission };
