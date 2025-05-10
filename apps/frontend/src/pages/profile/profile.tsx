import React, { useEffect, useState } from "react";
import {
	CircularProgress,
	Card,
	Avatar,
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	Grid,
	Typography,
	Tooltip,
	IconButton,
} from "@mui/material";
import { Close, EmojiEvents, Star } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as usersActions } from "~/modules/users/users.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import styles from "./profile.module.css";
import { notification } from "~/modules/notification/notification.js";

const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const { user: authUser } = useAppSelector((state) => state.auth);
	const { user, status, achievements } = useAppSelector((state) => state.users);

	const [dialogOpen, setDialogOpen] = useState(false);

	const isOwnProfile = authUser && user && authUser.id === user.id;

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

	const handleOpenAchievementDialog = () => {
		setDialogOpen(true);
	};

	const handleCloseAchievementDialog = () => {
		setDialogOpen(false);
	};

	const handleSetMainAchievement = (achievementId: string) => {
		if (user && isOwnProfile) {
			dispatch(usersActions.editMainAchievement({ achievementId }));

			const selectedAchievement = achievements.find(
				(a) => a.id === achievementId
			);

			notification.success(
				`${selectedAchievement?.title} set as your main achievement!`
			);
		}
	};

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
			padding={3}
		>
			<Card
				sx={{
					width: { xs: "95%", sm: "80%", md: "60%" },
					padding: 4,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					boxShadow: 3,
					borderRadius: 2,
					position: "relative",
					overflow: "visible",
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

				{
					<Box
						sx={{
							color: "#1976d2",
							padding: "4px 12px",
							borderRadius: 4,
							display: "flex",
							alignItems: "center",
							gap: 1,
							mb: 1,
							fontWeight: "bold",
						}}
					>
						<EmojiEvents fontSize="small" />
						<Typography
							variant="body1"
							fontWeight="bold"
							color="#1976d2"
						>
							{user.mainAchievementId
								? `${
										achievements.find((a) => a.id === user.mainAchievementId)!
											.title
									}`
								: "Junior Traveler"}
						</Typography>
					</Box>
				}

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
						mb: 3,
					}}
				>
					Email: {user.email}
				</Box>

				{/* Action buttons for authenticated user */}
				{isOwnProfile && (
					<Box sx={{ display: "flex", gap: 2, mb: 4 }}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<EmojiEvents />}
							onClick={handleOpenAchievementDialog}
							disabled={achievements.length === 0}
						>
							Change Main Achievement
						</Button>

						<Button
							variant="outlined"
							color="error"
							onClick={() => {
								dispatch(authActions.logOut());
								navigate(-1);
							}}
						>
							Logout
						</Button>
					</Box>
				)}

				{/* Achievements showcase */}
				{achievements.length > 0 && (
					<Box sx={{ width: "100%", mt: 3 }}>
						<Typography
							variant="h5"
							sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
						>
							Achievements Showcase
						</Typography>

						<Grid
							container
							spacing={2}
							className={styles.achievementsContainer}
						>
							{achievements.map((achievement) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									key={achievement.id}
								>
									<Card
										className={styles.achievementCard}
										sx={{
											padding: 2,
											height: "100%",
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											transition: "transform 0.2s, box-shadow 0.2s",
											position: "relative",
											border:
												achievement.id === user.mainAchievementId
													? "2px solid #1976d2"
													: "none",
											backgroundColor:
												achievement.id === user.mainAchievementId
													? "rgba(25, 118, 210, 0.08)"
													: "inherit",
											"&:hover": {
												transform: "translateY(-5px)",
												boxShadow: 5,
											},
										}}
									>
										{achievement.id === user.mainAchievementId && (
											<Star
												sx={{
													position: "absolute",
													top: 8,
													right: 8,
													color: "#1976d2",
												}}
											/>
										)}
										<img
											src={achievement.iconLink}
											alt={achievement.title}
											className={styles.achievementIcon}
											style={{
												height: 80,
												width: 80,
												objectFit: "contain",
												marginBottom: 16,
											}}
										/>
										<Typography
											variant="h6"
											className={styles.achievementTitle}
											sx={{ textAlign: "center" }}
										>
											{achievement.title}
										</Typography>
										<Typography
											variant="body2"
											className={styles.achievementDescription}
											sx={{ textAlign: "center" }}
										>
											{achievement.description}
										</Typography>
									</Card>
								</Grid>
							))}
						</Grid>
					</Box>
				)}

				{/* Achievement selection dialog */}
				<Dialog
					open={dialogOpen}
					onClose={handleCloseAchievementDialog}
					maxWidth="md"
					fullWidth
				>
					<DialogTitle sx={{ position: "relative", pb: 1 }}>
						<Typography
							variant="h5"
							component="div"
						>
							Select Your Main Achievement
						</Typography>
						<IconButton
							sx={{ position: "absolute", right: 8, top: 8 }}
							onClick={handleCloseAchievementDialog}
						>
							<Close />
						</IconButton>
					</DialogTitle>

					<DialogContent>
						<Grid
							container
							spacing={2}
							sx={{ pt: 1 }}
						>
							{achievements.map((achievement) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									key={achievement.id}
								>
									<Tooltip
										title={
											achievement.id === user.mainAchievementId
												? "Current main achievement"
												: "Select as main achievement"
										}
									>
										<Card
											onClick={() => handleSetMainAchievement(achievement.id)}
											sx={{
												padding: 2,
												cursor: "pointer",
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												height: "100%",
												transition: "transform 0.2s, box-shadow 0.2s",
												border:
													achievement.id === user.mainAchievementId
														? "2px solid #1976d2"
														: "1px solid #e0e0e0",
												backgroundColor:
													achievement.id === user.mainAchievementId
														? "rgba(25, 118, 210, 0.08)"
														: "inherit",
												"&:hover": {
													transform: "scale(1.02)",
													boxShadow: 3,
												},
											}}
										>
											<img
												src={achievement.iconLink}
												alt={achievement.title}
												style={{
													height: 60,
													width: 60,
													objectFit: "contain",
													marginBottom: 12,
												}}
											/>
											<Typography
												variant="h6"
												sx={{ textAlign: "center", fontSize: "1rem" }}
											>
												{achievement.title}
											</Typography>
											<Typography
												variant="body2"
												sx={{
													textAlign: "center",
													color: "text.secondary",
													mt: 1,
													fontSize: "0.85rem",
												}}
											>
												{achievement.id === user.mainAchievementId
													? "(Current)"
													: ""}
											</Typography>
										</Card>
									</Tooltip>
								</Grid>
							))}
						</Grid>
					</DialogContent>
				</Dialog>
			</Card>
		</Box>
	);
};

export { Profile };
