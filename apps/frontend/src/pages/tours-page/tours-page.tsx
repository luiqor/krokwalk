import styles from "./tours-page.module.css";
import { ToursInfoItem } from "~/libs/components/components.js";
import { useEffect, useState } from "react";
import type { DataTour } from "~/libs/components/tours-info-item/libs/types/types.js";

const ToursPage = () => {
	const [info, setInfo] = useState<DataTour[] | null>(null);
	const fetchData = async () => {
		const result = await fetch(
			`http://localhost:8000/api/tours/4d1d87d1-4b96-444a-bca7-abdbfc207daf`
		);
		const response = await result.json();
		setInfo(response.places);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className={styles.container}>
			{info && <ToursInfoItem data={info} />}
		</div>
	);
};

export { ToursPage };
