import { useEffect } from "react";

import { ToursInfoElement } from "~/libs/components/components.js";
import { useAppDispatch } from "~/libs/hooks/hooks.js";
import { actions as toursActions } from "~/modules/tours/tours.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import styles from "./tours-page.module.css";

const ToursPage = () => {
	const dispatch = useAppDispatch();

	const { tours } = useAppSelector((state) => state.tours);

	useEffect(() => {
		dispatch(toursActions.loadTours());
	}, [dispatch]);

	return (
		<section className={styles.container}>
			<ToursInfoElement data={tours} />
		</section>
	);
};

export { ToursPage };
