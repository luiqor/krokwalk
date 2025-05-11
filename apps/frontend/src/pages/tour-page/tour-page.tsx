import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TourInfo, TourInfoItem } from "~/libs/components/components.js";
import { useAppDispatch } from "~/libs/hooks/hooks.js";
import { actions as toursActions } from "~/modules/tours/tours.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { ButtonBack } from "~/libs/components/button-back/button-back.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

import styles from "./tour-page.module.css";

const TourPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { tour } = useAppSelector((state) => state.tours);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (!id) {
			navigate(AppRoute.ROOT);
		}

		dispatch(toursActions.loadTour({ id: id! }));
	}, [dispatch, id, navigate]);

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
