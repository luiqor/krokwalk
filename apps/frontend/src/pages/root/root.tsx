import {
	PopupWarning,
	RootMap,
	RouteToolbar,
} from "~/libs/components/components.js";

import { PlacesQueryParamsHandler } from "./libs/components/components.js";

import styles from "./root.module.css";
import { useEffect, useState } from "react";
import { useGeolocation } from "~/libs/components/popup-warning/libs/castome-hook/use-geolocation.js";

const Root = () => {
	const geolocation = useGeolocation();
	const [popupState, setPopupState] = useState<boolean>(false);

	useEffect(() => {
		setPopupState(geolocation);
	}, [geolocation]);

	return (
		<div className={styles.container}>
			<RouteToolbar />
			<RootMap />
			<PlacesQueryParamsHandler />
			<PopupWarning
				isOpen={popupState}
				onClose={() => setPopupState(true)}
			/>
		</div>
	);
};

export { Root };
