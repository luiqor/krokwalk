import { useRef, useState } from "react";
import { CircularProgress } from "@mui/material";

import {
	ConstraintsForm,
	RouteForm,
	CurrentTrip,
} from "./libs/components/components.js";
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

	const renderScreenBasedOnStatus = (
		component: React.JSX.Element
	): React.JSX.Element | null => {
		if (status === "pending") {
			return <CircularProgress />;
		}

		if (status === "fulfilled" || status === "idle") {
			return component;
		}

		dispatch(locationAction.setScreen(Screen.FILTERING));
		return null;
	};

	const getScreen = (
		screen: (typeof Screen)[keyof typeof Screen]
	): React.ReactNode => {
		switch (screen) {
			case Screen.FILTERING: {
				return <RouteForm />;
			}

			case Screen.CONSTRAINTS: {
				return renderScreenBasedOnStatus(<ConstraintsForm />);
			}

			case Screen.MY_TRIP: {
				return renderScreenBasedOnStatus(<CurrentTrip />);
			}
		}
	};

	const handleToolbar = (): void => {
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
				onClick={handleToolbar}
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
