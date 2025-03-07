import {
	RootMap,
	RouteToolbar,
	SvgSprite,
} from "~/libs/components/components.js";

import { PlacesQueryParamsHandler } from "./libs/components/components.js";

import styles from "./root.module.css";

const Root = () => {
	return (
		<div className={styles.container}>
			<RouteToolbar />
			<RootMap />
			<PlacesQueryParamsHandler />
			<SvgSprite />
		</div>
	);
};

export { Root };
