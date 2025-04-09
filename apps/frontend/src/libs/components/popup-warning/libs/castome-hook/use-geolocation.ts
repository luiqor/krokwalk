import { useEffect, useState } from "react";

const useGeolocation = () => {
	const [geolocation, setGeolocation] = useState<boolean>(false);
	useEffect(() => {
		navigator.permissions
			.query({ name: "geolocation" })
			.then((permissionsStatus) => {
				setGeolocation(permissionsStatus.state === "granted");

				const handlePermissionChange = () => {
					setGeolocation(permissionsStatus.state === "granted");
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

	return geolocation;
};

export { useGeolocation };
