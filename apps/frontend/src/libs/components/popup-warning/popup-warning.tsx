import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import IconRuns from "../../../assets/images/mapchik-runs.svg";
import { IconElement } from "~/libs/components/components.js";

import type { WarningProps } from "~/libs/components/popup-warning/libs/types/types.js";

import styles from "./popup-warning.module.css";
import { DomUtil } from "leaflet";

const modalWarning: HTMLElement = document.getElementById(
	"modalWarning"
) as HTMLElement;

const PopupWarning: React.FC<WarningProps> = ({ isOpen, onClose }) => {
	return ReactDOM.createPortal(
		<>
			<CSSTransition
				in={!isOpen}
				timeout={500}
				classNames={{
					enter: styles.fadeIn,
					enterActive: styles.fadeInActive,
					exit: styles.fadeOut,
					exitActive: styles.fadeOutActive,
				}}
				onEnter={(node) => node.classList.remove(styles.hide)}
				onEntered={(node) => node.classList.add(styles.backGroundInActive)}
				onExit={(node) => node.classList.remove(styles.backGroundInActive)}
				onExited={(node) => {
					setTimeout(() => node.classList.add(styles.hide), 500);
				}}
			>
				<div className={styles.backGround}></div>
			</CSSTransition>

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
					<img
						className={styles.mapchikSvg}
						src={IconRuns}
					/>
				</div>
			</article>
		</>,
		modalWarning
	);
};

export { PopupWarning };
