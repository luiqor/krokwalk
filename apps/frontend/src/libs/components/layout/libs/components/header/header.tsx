import { Link } from "react-router-dom";
import { AppRoute } from "~/libs/enums/enums.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import styles from "./header.module.css";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";

const Header = () => {
	const dispatch = useAppDispatch();
	const { user, status } = useAppSelector((state) => state.auth);

	if (!user && status === "idle") {
		dispatch(authActions.getUser());
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
					<Link to={AppRoute.TOURS}>Tours</Link>
					{user ? (
						<>
							<Link to={AppRoute.LEADERBOARD}>Leaderboard</Link>
							<div>
								Welcome <Link to={AppRoute.PROFILE}>{user.username}</Link>
							</div>
						</>
					) : (
						<Link to={AppRoute.SIGN_IN}>Login</Link>
					)}
				</nav>
			</div>
		</header>
	);
};

export { Header };
