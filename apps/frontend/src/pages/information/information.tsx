import { useTrackingGeolocationPermission } from "~/libs/components/popup-warning/libs/castome-hook/use-tracking-geolocation-permission.js";

import {
	InformationSection,
	PopupWarning,
} from "~/libs/components/components.js";

import styles from "./information.module.css";

const Information = () => {
	const geolocation = useTrackingGeolocationPermission();

	return (
		<div className={styles.container}>
			<InformationSection />
			<PopupWarning
				isOpen={geolocation.isGeolocationEnabled}
				onClose={() => geolocation.closedPopup()}
			/>
		</div>
	);
};

export { Information };
