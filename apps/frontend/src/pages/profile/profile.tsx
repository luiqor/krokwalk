import React, { useEffect } from "react";
import { CircularProgress, Card, Avatar, Box } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as usersActions } from "~/modules/users/users.js";

const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");

	const { user: authUser } = useAppSelector((state) => state.auth);
	const { user, status } = useAppSelector((state) => state.users);

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
			</Card>
		</Box>
	);
};

export { Profile };
