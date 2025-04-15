import { Link } from "react-router-dom";
import { AppRoute } from "~/libs/enums/enums.js";

import styles from "./header.module.css";
import { useAppSelector } from "~/libs/hooks/hooks.js";

const Header = () => {
	const { user } = useAppSelector((state) => state.auth);

	if (!user) {
		// get user
	}

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Link
					to={AppRoute.ROOT}
					className={styles.title}
				>
					KrokWalk
				</Link>
				<nav className={styles.navigation}>
					{user ? (
						`Welcome ${user.username}`
					) : (
						<Link to={AppRoute.SIGN_IN}>Login</Link>
					)}
				</nav>
			</div>
		</header>
	);
};

export { Header };
