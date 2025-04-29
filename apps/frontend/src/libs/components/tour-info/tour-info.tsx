import React from "react";

import { ButtonBack } from "~/libs/components/button-back/button-back.js";

import styles from "./tour-info.module.css";

const TourInfo: React.FC<Record<string, string>> = ({ title, description }) => {
	return (
		<article className={styles.headerTour}>
			<h2>{title}</h2>
			<p>{description}</p>
		</article>
	);
};

export { TourInfo };
