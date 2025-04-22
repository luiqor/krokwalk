import styles from "./tours-page.module.css";
import { TourInfo, TourInfoItem } from "~/libs/components/components.js";
import { useEffect, useState } from "react";

import type { RecvestTour } from "~/pages/tours-page/libs/types/types.js";

const ToursPage = () => {
	const [info, setInfo] = useState<RecvestTour | null>(null);
	const fetchData = async () => {
		const result = await fetch(
			`http://localhost:8000/api/tours/4d1d87d1-4b96-444a-bca7-abdbfc207daf`
		);
		setInfo(await result.json());
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className={styles.container}>
			{info && (
				<>
					<TourInfo
						title={info.title}
						description={info.description}
					/>
					<TourInfoItem data={info.places} />
				</>
			)}
		</section>
	);
};

export { ToursPage };
