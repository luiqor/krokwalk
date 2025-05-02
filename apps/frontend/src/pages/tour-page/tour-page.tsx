import React, { useEffect } from "react";

import { TourInfo, TourInfoItem } from "~/libs/components/components.js";

import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "~/libs/hooks/hooks.js";
import { actions as toursActions } from "~/modules/tours/tours.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import styles from "./tour-page.module.css";
import { ButtonBack } from "~/libs/components/button-back/button-back.js";

const TourPage = () => {
	const dispatch = useAppDispatch();
	const { tour } = useAppSelector((state) => state.tours);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		dispatch(toursActions.loadTour({ id: searchParams.get("id") as string }));
	}, [dispatch, searchParams]);

	return (
		<section className={styles.container}>
			{tour && (
				<>
					<ButtonBack subClass={styles.subBackClass} />
					<TourInfo
						title={tour.title}
						description={tour.description}
					/>

					<TourInfoItem data={tour.places} />
				</>
			)}
		</section>
	);
};

export { TourPage };
