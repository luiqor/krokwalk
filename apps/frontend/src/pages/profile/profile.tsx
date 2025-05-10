import React, { useEffect } from "react";
import { CircularProgress, Card, Avatar, Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as usersActions } from "~/modules/users/users.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import styles from "./profile.module.css";

const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const { user: authUser } = useAppSelector((state) => state.auth);
	const { user, status, achievements } = useAppSelector((state) => state.users);

	useEffect(() => {
		if (status === "pending" || status === "fulfilled") {
			return;
		}

		if (status === "rejected" || (!authUser && !id)) {
			navigate(AppRoute.SIGN_IN);
			return;
		}

		if (id) {
			dispatch(usersActions.getUser({ id }));
		} else if (authUser) {
			dispatch(usersActions.getUser({ id: authUser.id }));
		}
	}, [dispatch, id, authUser, status, navigate]);

	if (status === "pending" || user === null) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="100vh"
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Card
				sx={{
					width: "60%",
					padding: 4,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					boxShadow: 3,
				}}
			>
				<Avatar
					sx={{
						bgcolor: "primary.main",
						width: 150,
						height: 150,
						mb: 3,
					}}
					alt={user.username}
				>
					{user.username[0].toUpperCase()}
				</Avatar>
				<Box
					component="h2"
					sx={{
						margin: 0,
						fontSize: "2rem",
						fontWeight: "bold",
						textAlign: "center",
						mb: 2,
					}}
				>
					{user.username}
				</Box>
				<Box
					component="p"
					sx={{
						fontSize: "1.2rem",
						color: "text.secondary",
						textAlign: "center",
					}}
				>
					Email: {user.email}
				</Box>
				{authUser && authUser.id === user.id && (
					<Button
						onClick={() => {
							dispatch(authActions.logOut());
							navigate(-1);
						}}
					>
						Logout
					</Button>
				)}
				{achievements.length > 0 && (
					<div className={styles.achievementsContainer}>
						{achievements.map((achievement) => (
							<div
								key={achievement.id}
								className={styles.achievementCard}
							>
								<img
									src={achievement.iconLink}
									alt={achievement.title}
									className={styles.achievementIcon}
								/>
								<h3 className={styles.achievementTitle}>{achievement.title}</h3>
								<p className={styles.achievementDescription}>
									{achievement.description}
								</p>
							</div>
						))}
					</div>
				)}
			</Card>
		</Box>
	);
};

export { Profile };
