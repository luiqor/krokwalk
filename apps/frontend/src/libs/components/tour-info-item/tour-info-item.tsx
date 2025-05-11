import React from "react";
import { useNavigate } from "react-router-dom";

import { IconElement } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import type { ToursArr } from "./libs/types/types.js";
import IconLovely from "../../../assets/images/mapckik-lovely.svg";
import IconJumps from "../../../assets/images/mapchik-jumps-happily.svg";
import IconRuns from "../../../assets/images/mapchik-runs.svg";
import IconAngry from "../../../assets/images/mapckik-angry.svg";

import styles from "./tour-info-item.module.css";

const TourInfoItem: React.FC<ToursArr> = ({ data }) => {
	const navigate = useNavigate();

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

	const stylePath = (index: number) => {
		switch (index % 4) {
			case 1:
				return {
					name: `path1`,
					widthSize: 514,
					heightSize: 395,
					addClass: styles.svgPosition1,
				};
			case 2:
				return {
					name: `path2`,
					widthSize: 702,
					heightSize: 645,
					addClass: styles.svgPosition2,
				};
			case 3:
				return {
					name: `path3`,
					widthSize: 407,
					heightSize: 324,
					addClass: styles.svgPosition3,
				};
			case 0:
				return {
					name: `path4`,
					widthSize: 170,
					heightSize: 204,
					addClass: styles.svgPosition4,
				};
		}
	};

	const svgOption = () => {
		const arraySvg = [IconLovely, IconJumps, IconAngry, IconRuns];
		const randomSvg = Math.floor(Math.random() * arraySvg.length);
		return arraySvg[randomSvg];
	};

	return (
		<section>
			{data &&
				data.map((item, index) => (
					<div
						className={styles.toursItemBlock}
						key={item.id}
					>
						<article
							className={`${styles.toursItem} ${stylesPostion(index)}`}
							key={item.id}
						>
							<picture className={styles.imgBlock}>
								<img
									src={item.thumbnailLink}
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
								point №{++index}
							</span>
							<h3>{item.title}</h3>
							<button
								onClick={() => {
									navigate(AppRoute.PLACE_$ID.replace(":id", item.id));
								}}
							>
								read more
							</button>
						</article>
						{data.length > index && (
							<IconElement
								svgData={{
									color: "transparent",
									...stylePath(index),
								}}
							/>
						)}
						{index % 2 === 0 && (
							<picture
								className={`${styles.blockSubImg} ${index % 4 ? styles.subImgLeft : styles.subImgRight}`}
							>
								<img src={svgOption()} />
							</picture>
						)}
					</div>
				))}
		</section>
	);
};

export { TourInfoItem };
