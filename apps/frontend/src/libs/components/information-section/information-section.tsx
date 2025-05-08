import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { PlaceDto } from "~/modules/places/places.js";
import { ButtonBack } from "~/libs/components/button-back/button-back.js";

import styles from "./information-section.module.css";

const InformationSection = () => {
	const [info, setInfo] = useState<PlaceDto | null>(null);
	const { id } = useParams();

	useEffect(() => {
		if (!id || info !== null) {
			return;
		}

		const fetchData = async (id: string | undefined) => {
			if (!id) {
				return;
			}

			const result = await fetch(`http://localhost:8000/api/places/${id}`);
			setInfo(await result.json());
		};

		fetchData(id);
	}, [id, info]);

	return (
		<section className={styles.container}>
			<ButtonBack subClass={styles.subBackClass} />
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
