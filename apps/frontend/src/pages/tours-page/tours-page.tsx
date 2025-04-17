import styles from "./tours-page.module.css";
import { ToursInfoItem } from "~/libs/components/components.js";
import { useState } from "react";
import type { PlaceDto } from "shared";

const ToursPage = () => {
	const [info, setInfo] = useState<PlaceDto | null>(null);
	const fetchData = async (id: string | null) => {
		const result = await fetch(`http://localhost:8000/api/places/${id}`);
		setInfo(await result.json());
		setTimeout(() => console.log(info), 600);
	};

	return (
		<div className={styles.container}>
			<ToursInfoItem
				data={[
					{ id: 1, title: "Tours Page", image: "" },
					{ id: 2, title: "Tours Page", image: "" },
					{ id: 3, title: "Tours Page", image: "" },
					{ id: 4, title: "Tours Page", image: "" },
					{ id: 5, title: "Tours Page", image: "" },
					{ id: 6, title: "Tours Page", image: "" },
					{ id: 7, title: "Tours Page", image: "" },
					{ id: 8, title: "Tours Page", image: "" },
				]}
			/>
		</div>
	);
};

export { ToursPage };
