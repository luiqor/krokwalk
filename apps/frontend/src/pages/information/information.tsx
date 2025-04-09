import { useEffect, useState } from "react";
import { useGeolocation } from "~/libs/components/popup-warning/libs/castome-hook/use-geolocation.js";

import {
	InformationSection,
	PopupWarning,
} from "~/libs/components/components.js";

import styles from "./information.module.css";

const Information = () => {
	const geolocation = useGeolocation();
	const [popupState, setPopupState] = useState<boolean>(false);

	useEffect(() => {
		setPopupState(geolocation);
	}, [geolocation]);

	return (
		<div className={styles.container}>
			<InformationSection />
			<PopupWarning
				isOpen={popupState}
				onClose={() => setPopupState(true)}
			/>
		</div>
	);
};

export { Information };
