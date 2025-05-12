import React, { useEffect, useState } from "react";
import {
	CircularProgress,
	Tabs,
	Tab,
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Avatar,
	Card,
} from "@mui/material";
import {
	DateRange as DateRangeIcon,
	CalendarMonth as CalendarMonthIcon,
	EmojiEvents as EmojiEventsIcon,
	Looks as BronzeIcon,
	Looks as SilverIcon,
	Looks as GoldIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as usersActions } from "~/modules/users/users.js";

import styles from "./leaderboard.module.css";

const Leaderboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [tabValue, setTabValue] = useState(0);
	const limit = 20; // Get more users to display

	// Get users and loading status from the Redux store
	const { users, status } = useAppSelector((state) => state.users);
	const isLoading = status === "pending";

	// Separate top 3 users and rest of users
	const topUsers = users.slice(0, 3);
	const otherUsers = users.slice(3);

	// Fetch data based on active tab
	useEffect(() => {
		if (tabValue === 0) {
			dispatch(
				usersActions.getTopUsersByConfirmedPlaces({
					monthsCount: 12,
					limit,
					page: 1,
				})
			);
		} else if (tabValue === 1) {
			dispatch(
				usersActions.getTopUsersByConfirmedPlaces({
					monthsCount: 1,
					limit,
					page: 1,
				})
			);
		} else if (tabValue === 2) {
			dispatch(
				usersActions.getTopUsersByVisitedPlaces({
					limit,
					page: 1,
				})
			);
		}
	}, [dispatch, tabValue, limit]);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const getTabLabel = (index: number) => {
		switch (index) {
			case 0:
				return "1 Year Places";
			case 1:
				return "1 Month Places";
			case 2:
				return "Achievements";
			default:
				return "";
		}
	};

	const getTabIcon = (index: number) => {
		switch (index) {
			case 0:
				return <DateRangeIcon className={styles.tabIcon} />;
			case 1:
				return <CalendarMonthIcon className={styles.tabIcon} />;
			case 2:
				return <EmojiEventsIcon className={styles.tabIcon} />;
			default:
				return undefined;
		}
	};

	if (isLoading && users.length === 0) {
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
					width: { xs: "95%", sm: "80%", md: "70%" },
					padding: 4,
					display: "flex",
					flexDirection: "column",
					boxShadow: 3,
					borderRadius: 2,
				}}
			>
				<Typography
					variant="h4"
					component="h1"
					sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
				>
					Leaderboards
				</Typography>

				<Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						aria-label="leaderboard tabs"
						variant="fullWidth"
					>
						<Tab
							icon={getTabIcon(0)}
							label={getTabLabel(0)}
							id="leaderboard-tab-0"
							aria-controls="leaderboard-tabpanel-0"
						/>
						<Tab
							icon={getTabIcon(1)}
							label={getTabLabel(1)}
							id="leaderboard-tab-1"
							aria-controls="leaderboard-tabpanel-1"
						/>
						<Tab
							icon={getTabIcon(2)}
							label={getTabLabel(2)}
							id="leaderboard-tab-2"
							aria-controls="leaderboard-tabpanel-2"
						/>
					</Tabs>
				</Box>

				{isLoading ? (
					<Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
						<CircularProgress />
					</Box>
				) : (
					<>
						{/* Top 3 Podium Section */}
						{topUsers.length > 0 && (
							<Box className={styles.podiumContainer}>
								{/* Create the podium with 2nd, 1st, 3rd place arrangement */}
								<Box className={styles.podiumLayout}>
									{/* 2nd Place - Silver */}
									{topUsers.length > 1 && (
										<Box
											className={`${styles.podiumItem} ${styles.silverPosition}`}
										>
											<div className={`${styles.crown} ${styles.silverCrown}`}>
												<SilverIcon
													fontSize="large"
													style={{ color: "silver" }}
												/>
											</div>
											<Avatar
												onClick={() => navigate(`/profile/${topUsers[1]?.id}`)}
												className={`${styles.topAvatar} ${styles.silverAvatar}`}
												sx={{ width: 80, height: 80 }}
											>
												{topUsers[1]?.username?.charAt(0).toUpperCase() || "?"}
											</Avatar>
											<Typography className={styles.topUsername}>
												{topUsers[1]?.username}
											</Typography>
											<div className={styles.topScoreBadge}>
												{topUsers[1]?.leaderItemsCount}
											</div>
											<div
												className={`${styles.podiumBlock} ${styles.silverBlock}`}
											>
												<Typography variant="h5">2</Typography>
											</div>
										</Box>
									)}

									{/* 1st Place - Gold */}
									<Box
										className={`${styles.podiumItem} ${styles.goldPosition}`}
									>
										<div className={`${styles.crown} ${styles.goldCrown}`}>
											<GoldIcon fontSize="large" />
										</div>
										<Avatar
											onClick={() => navigate(`/profile/${topUsers[0]?.id}`)}
											className={`${styles.topAvatar} ${styles.goldAvatar}`}
											sx={{ width: 100, height: 100 }}
										>
											{topUsers[0]?.username?.charAt(0).toUpperCase() || "?"}
										</Avatar>
										<Typography
											className={styles.topUsername}
											variant="h6"
											fontWeight="bold"
										>
											{topUsers[0]?.username}
										</Typography>
										<div
											className={`${styles.topScoreBadge} ${styles.goldScore}`}
										>
											{topUsers[0]?.leaderItemsCount}
										</div>
										<div
											className={`${styles.podiumBlock} ${styles.goldBlock}`}
										>
											<Typography variant="h5">1</Typography>
										</div>
									</Box>

									{/* 3rd Place - Bronze */}
									{topUsers.length > 2 && (
										<Box
											className={`${styles.podiumItem} ${styles.bronzePosition}`}
										>
											<div className={`${styles.crown} ${styles.bronzeCrown}`}>
												<BronzeIcon fontSize="large" />
											</div>
											<Avatar
												onClick={() => navigate(`/profile/${topUsers[2]?.id}`)}
												className={`${styles.topAvatar} ${styles.bronzeAvatar}`}
												sx={{ width: 70, height: 70 }}
											>
												{topUsers[2]?.username?.charAt(0).toUpperCase() || "?"}
											</Avatar>
											<Typography className={styles.topUsername}>
												{topUsers[2]?.username}
											</Typography>
											<div className={styles.topScoreBadge}>
												{topUsers[2]?.leaderItemsCount}
											</div>
											<div
												className={`${styles.podiumBlock} ${styles.bronzeBlock}`}
											>
												<Typography variant="h5">3</Typography>
											</div>
										</Box>
									)}
								</Box>
							</Box>
						)}

						{/* Rest of users table */}
						{otherUsers.length > 0 && (
							<TableContainer
								component={Paper}
								className={styles.tableContainer}
							>
								<Table aria-label="leaderboard table">
									<TableHead>
										<TableRow>
											<TableCell className={styles.rankCell}>Rank</TableCell>
											<TableCell>User</TableCell>
											<TableCell align="right">
												{tabValue === 2 ? "Achievements" : "Places"}
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{otherUsers.map((user, index) => (
											<TableRow
												key={user.id}
												className={index % 2 === 0 ? styles.evenRow : ""}
											>
												<TableCell className={styles.rankCell}>
													<div className={styles.rankBadge}>{index + 4}</div>
												</TableCell>
												<TableCell>
													<div className={styles.userInfo}>
														<Avatar
															className={styles.avatar}
															onClick={() => navigate(`/profile/${user.id}`)}
														>
															{user.username?.charAt(0).toUpperCase() || "U"}
														</Avatar>
														<Typography className={styles.username}>
															{user.username}
														</Typography>
													</div>
												</TableCell>
												<TableCell
													align="right"
													className={styles.scoreCell}
												>
													<div className={styles.scoreBadge}>
														{user.leaderItemsCount}
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						)}

						{users.length === 0 && (
							<Box
								sx={{ textAlign: "center", p: 4 }}
								className={styles.noData}
							>
								<Typography
									variant="h6"
									color="text.secondary"
								>
									No users found
								</Typography>
							</Box>
						)}
					</>
				)}
			</Card>
		</Box>
	);
};

export { Leaderboard };
