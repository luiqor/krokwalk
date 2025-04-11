import { useEffect, useState } from "react";

const useTrackingGeolocationPermission = () => {
	const [isGeolocationEnabled, setIsGeolocationEnabled] =
		useState<boolean>(false);

	useEffect(() => {
		navigator.permissions
			.query({ name: "geolocation" })
			.then((permissionsStatus) => {
				setIsGeolocationEnabled(permissionsStatus.state === "granted");

				const handlePermissionChange = () => {
					setIsGeolocationEnabled(permissionsStatus.state === "granted");
				};

				permissionsStatus.addEventListener("change", handlePermissionChange);

				return () => {
					permissionsStatus.removeEventListener(
						"change",
						handlePermissionChange
					);
				};
			});
	}, []);

	const closedPopup = () => {
		setIsGeolocationEnabled(true);
	};

	return { isGeolocationEnabled, closedPopup };
};

export { useTrackingGeolocationPermission };
