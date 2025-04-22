import React from "react";

import styles from "./tour-info.module.css";
import { ButtonBack } from "~/libs/components/button-back/button-back.js";

const TourInfo: React.FC<Record<string, string>> = ({ title, description }) => {
	return (
		<article className={styles.headerTour}>
			<ButtonBack subClass={styles.subBackClass} />
			<h2>{title}</h2>
			<p>{description}</p>
		</article>
	);
};

export { TourInfo };
