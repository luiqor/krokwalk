import { useRef, useState } from "react";
import { CircularProgress } from "@mui/material";

import { ConstraintsForm, RouteForm } from "./libs/components/components.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import {
	Screen,
	actions as locationAction,
} from "~/modules/location/location.js";
import { IconElement } from "~/libs/components/components.js";

import styles from "./route-toolbar.module.css";

const RouteToolbar: React.FC = () => {
	const dispatch = useAppDispatch();
	const { selectionMode, screen } = useAppSelector((state) => state.location);
	const { status } = useAppSelector((state) => state.trips);
	const [toolbarState, setToolbarState] = useState<boolean>(true);
	const iconElementRef = useRef<SVGSVGElement>(null);
	const toolbarRef = useRef<HTMLDivElement>(null);
	const getScreen = (
		screen: (typeof Screen)[keyof typeof Screen]
	): React.ReactNode => {
		switch (screen) {
			case Screen.FILTERING: {
				return <RouteForm />;
			}

			case Screen.CONSTRAINTS: {
				if (status === "pending") {
					return <CircularProgress />;
				}

				if (status === "fulfilled") {
					return <ConstraintsForm />;
				}

				dispatch(locationAction.setScreen(Screen.FILTERING));
			}
		}
	};

	const handleTollbar = (): void => {
		if (!iconElementRef.current || !toolbarRef.current) {
			return;
		}

		setToolbarState(!toolbarState);
		iconElementRef.current.classList.toggle(
			styles.arrowSvgActive,
			toolbarState
		);
		toolbarRef.current.classList.toggle(styles.toolbarActive, toolbarState);
	};

	return (
		<div
			className={styles.toolbar}
			ref={toolbarRef}
		>
			<button
				className={styles.svgBlock}
				onClick={handleTollbar}
			>
				<IconElement
					ref={iconElementRef}
					svgData={{
						addClass: styles.arrowSvg,
						name: "arrow",
						widthSize: 15,
						heightSize: 20,
					}}
				/>
			</button>
			<div className={styles.toolbarMain}>
				{selectionMode && <div className={styles.mask} />}
				{getScreen(screen)}
			</div>
		</div>
	);
};

export { RouteToolbar };
