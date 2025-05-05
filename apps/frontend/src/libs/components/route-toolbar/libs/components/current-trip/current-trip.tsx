import React from "react";
import { VisitStatus } from "shared";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { Button, Tooltip } from "@mui/material";

import { actions as locationAction } from "~/modules/location/location.js";
import { actions as tripAction } from "~/modules/trips/trips.js";

import styles from "./current-trip.module.css";
import { convertSecondsToHoursAndMinutes } from "~/libs/components/route-toolbar/libs/components/constraints-form/libs/helpers/helpers.js";
import { PointCard } from "./libs/components/point-card/point-card.js";

const CurrentTrip: React.FC = () => {
	const { startingPoint, destinationPoint, stopoverPoints, walkSeconds } =
		useAppSelector((state) => state.trips);
	const dispatch = useAppDispatch();
	const { isAnonymousEnabled, user } = useAppSelector((state) => state.auth);

	const handlePlanAnotherTrip = () => {
		dispatch(locationAction.resetLocationData());
		dispatch(tripAction.resetTripData());
	};

	const handleCompleteTrip = () => {
		// TODO: Implement the logic to complete the trip
	};

	const { hours, minutes } = convertSecondsToHoursAndMinutes(walkSeconds ?? 0);

	const areAllPointConfirmed = stopoverPoints.every(
		(point) => point.visitStatus === VisitStatus.CONFIRMED
	);

	return (
		<div className={styles.container}>
			<div className={styles.walkTime}>
				<p>Estimated Walk Time:</p>
				{hours} hours {minutes} minutes
			</div>
			<div className={styles.tripList}>
				{startingPoint.length > 0 && (
					<div className={styles.point}>
						<div className={styles.icon}>📍</div>
						<div className={styles.details}>
							<h3>Starting Point</h3>
							<p>
								Latitude: {startingPoint[0]}, Longitude: {startingPoint[1]}
							</p>
						</div>
					</div>
				)}
				{stopoverPoints.map((point) => (
					<PointCard
						key={point.id}
						point={point}
					/>
				))}
				{destinationPoint.length > 0 && (
					<div className={styles.point}>
						<div className={styles.icon}>🏁</div>
						<div className={styles.details}>
							<h3>Destination</h3>
							<p>
								Latitude: {destinationPoint[0]}, Longitude:
								{destinationPoint[1]}
							</p>
						</div>
					</div>
				)}
			</div>
			<div className={styles.buttonContainer}>
				{(isAnonymousEnabled || user) && (
					<Tooltip
						title={
							!areAllPointConfirmed
								? "You need to confirm all stopover points to complete the trip."
								: ""
						}
						placement="top"
						arrow
					>
						<span>
							<Button
								variant="contained"
								fullWidth
								disabled={!areAllPointConfirmed}
								onClick={handleCompleteTrip}
							>
								Complete Trip
							</Button>
						</span>
					</Tooltip>
				)}
				<Button
					variant="contained"
					fullWidth
					onClick={handlePlanAnotherTrip}
				>
					Plan Another Trip
				</Button>
			</div>
		</div>
	);
};

export { CurrentTrip };
