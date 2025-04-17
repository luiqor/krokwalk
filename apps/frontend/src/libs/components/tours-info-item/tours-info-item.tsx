import React from "react";

import styles from "./tours-info-item.module.css";
import { IconElement } from "~/libs/components/components.js";
import type { DataArr } from "~/libs/components/tours-info-item/libs/types/types.js";

const ToursInfoItem: React.FC<DataArr> = ({ data }) => {
	const stylesPostion = (index: number) => {
		switch (index % 4) {
			case 0:
				return styles.position1;
			case 1:
				return styles.position2;
			case 2:
				return styles.position3;
			case 3:
				return styles.position4;
		}
	};

	return (
		<section>
			{data.map((item, index) => (
				<article
					className={`${styles.toursItem} ${stylesPostion(index)}`}
					key={item.id}
				>
					<picture className={styles.imgBlock}>
						<img
							src={item.image}
							alt={item.title}
						/>
					</picture>
					<span>
						<IconElement
							svgData={{
								addClass: styles.svgGeoPoint,
								name: "geoPoint",
								widthSize: 20,
								heightSize: 20,
							}}
						/>{" "}
						point №{index}
					</span>
					<h3>{item.title}</h3>
					<button>read more</button>
				</article>
			))}
		</section>
	);
};

export { ToursInfoItem };
