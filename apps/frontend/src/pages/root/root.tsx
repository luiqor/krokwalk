import { RootMap, RouteToolbar } from "~/libs/components/components.js";

import { PlacesQueryParamsHandler } from "./libs/components/components.js";
import { AchievementCongratsModal } from "~/libs/components/components.js";

import styles from "./root.module.css";

const Root = () => {
	return (
		<>
			<AchievementCongratsModal />
			<div className={styles.container}>
				<RouteToolbar />
				<RootMap />
				<PlacesQueryParamsHandler />
			</div>
		</>
	);
};

export { Root };
