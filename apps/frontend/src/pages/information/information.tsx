import { InformationSection } from "~/libs/components/components.js";

import styles from "./information.module.css";

const Information = () => {
	return (
		<div className={styles.container}>
			<InformationSection />
		</div>
	);
};

export { Information };
