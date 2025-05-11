import React from "react";

import type { ToursInfoElement } from "./libs/types/types.js";

import styles from "./tours-info-element.module.css";
import { IconElement } from "~/libs/components/icon/icon-element.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useNavigate } from "react-router-dom";
import { ButtonBack } from "~/libs/components/button-back/button-back.js";

const ToursInfoElement: React.FC<ToursInfoElement> = ({ data }) => {
	const navigate = useNavigate();

	return (
		<section className={styles.container}>
			<ButtonBack />
			<h2>Сity Tours</h2>
			{data.map((item, index) => (
				<article
					className={`${styles.toursItem}`}
					key={item.id}
				>
					<span>
						<IconElement
							svgData={{
								addClass: styles.svgGeoPoint,
								name: "geoPoint",
								widthSize: 20,
								heightSize: 20,
							}}
						/>{" "}
						Tours №{++index}
					</span>
					<h3>{item.title}</h3>
					<p>{item.description}</p>
					<button
						onClick={() => navigate(AppRoute.TOUR_$ID.replace(":id", item.id))}
					>
						read more
					</button>
				</article>
			))}
		</section>
	);
};

export { ToursInfoElement };
