import {
	// PopupWarning,
	RootMap,
	RouteToolbar,
} from "~/libs/components/components.js";

import { PlacesQueryParamsHandler } from "./libs/components/components.js";

import styles from "./root.module.css";
// import { useTrackingGeolocationPermission } from "~/libs/components/popup-warning/libs/castome-hook/use-tracking-geolocation-permission.js";

const Root = () => {
	// const geolocation = useTrackingGeolocationPermission();

	return (
		<div className={styles.container}>
			<RouteToolbar />
			<RootMap />
			<PlacesQueryParamsHandler />
			{/* <PopupWarning
				isOpen={geolocation.isGeolocationEnabled}
				onClose={() => geolocation.closedPopup()}
			/> */}
		</div>
	);
};

export { Root };
