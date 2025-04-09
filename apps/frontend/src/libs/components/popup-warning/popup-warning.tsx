import React from "react";
import ReactDOM from "react-dom";

import { IconElement } from "~/libs/components/components.js";

import type { WarningProps } from "~/libs/components/popup-warning/libs/types/types.js";

import styles from "./popup-warning.module.css";

const modalWarning: HTMLElement = document.getElementById(
	"modalWarning"
) as HTMLElement;

const PopupWarning: React.FC<WarningProps> = ({ isOpen, onClose }) => {
	if (isOpen) return null;

	return ReactDOM.createPortal(
		<>
			<div className={styles.backGround}></div>
			<article className={styles.popap}>
				<button
					className={styles.button}
					onClick={onClose}
				>
					<IconElement
						svgData={{
							addClass: styles.crossSvg,
							name: "cross",
							widthSize: 20,
							heightSize: 20,
						}}
					/>
				</button>
				<div className={styles.info}>
					<div className={styles.textGrup}>
						<h2 className={styles.title}>Unable to obtain your location</h2>
						<p className={styles.text}>
							Your device cannot connect to geolocation services. For this
							feature to work correctly, please check your geolocation settings
							and share your location.
						</p>
					</div>
					<IconElement
						svgData={{
							addClass: styles.mapchikSvg,
							name: "mapchikRuns",
							widthSize: 100,
							heightSize: 170,
						}}
					/>
				</div>
			</article>
		</>,
		modalWarning
	);
};

export { PopupWarning };
