import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import type { PlaceDto } from "~/modules/places/places.js";

import styles from "./information-section.module.css";
import { IconElement } from "~/libs/components/components.js";

const InformationSection = () => {
	const [info, setInfo] = useState<PlaceDto | null>(null);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const fetchData = async (id: string | null) => {
		const result = await fetch(`http://localhost:8000/api/places/${id}`);
		setInfo(await result.json());
		setTimeout(() => console.log(info), 600);
	};

	useEffect(() => {
		fetchData(searchParams.get("id"));
	}, []);

	return (
		<section className={styles.container}>
			<button
				onClick={() => navigate(-1)}
				className={styles.buttonBack}
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
			<picture className={styles.imgBlock}>
				<img
					className={styles.img}
					src={info?.thumbnailLink}
					alt={info?.title}
				/>
			</picture>
			<div className={styles.textBlock}>
				<h2 className={styles.title}>{info?.title}</h2>
				<div className={styles.tagBlock}>
					{info?.tags.map((item, index) => (
						<span
							className={styles.tag}
							key={index}
						>
							#{item.title}
						</span>
					))}
				</div>
				<p className={styles.address}>{info?.address}</p>
				<p className={styles.text}>{info?.description}</p>
			</div>
		</section>
	);
};

export { InformationSection };
