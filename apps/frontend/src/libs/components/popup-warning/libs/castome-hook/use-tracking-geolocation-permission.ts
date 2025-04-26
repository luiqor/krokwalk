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
				{ enableHighAccuracy: false, timeout: 10000 }
			);
		};

		checkGeolocation();

		return () => {
			if (watcher) navigator.geolocation.clearWatch(watcher);
		};
	}, []);

	const closedPopup = () => {
		setIsGeolocationEnabled(false);
	};

	return { isGeolocationEnabled, closedPopup };
};

export { useTrackingGeolocationPermission };
