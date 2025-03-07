import { RootMap, RouteToolbar } from "~/libs/components/components.js";

import { PlacesQueryParamsHandler } from "./libs/components/components.js";

import styles from "./root.module.css";
import SvgSprite from "~/libs/components/icon/svg-sprite.js";

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
