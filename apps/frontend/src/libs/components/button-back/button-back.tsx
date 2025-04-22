import React from "react";
import { useNavigate } from "react-router-dom";

import { IconElement } from "~/libs/components/icon/icon-element.js";

import styles from "./button-back.module.css";

const ButtonBack: React.FC<Record<string, string>> = ({ subClass }) => {
	const navigate = useNavigate();

	return (
		<button
			className={`${styles.buttonBack} ${subClass}`}
			onClick={() => navigate(-1)}
		>
			<IconElement
				svgData={{
					addClass: styles.svgBack,
					name: "back",
					widthSize: 24,
					heightSize: 24,
					color: "transparent",
				}}
			/>
			<span className={styles.textBack}>Back</span>
		</button>
	);
};

export { ButtonBack };
