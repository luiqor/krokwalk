import React from "react";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import styles from "./current-trip.module.css";
import { Button } from "@mui/material";

const CurrentTrip: React.FC = () => {
	const { startingPoint, destinationPoint, stopoverPoints, walkSeconds } =
		useAppSelector((state) => state.trips);

	return (
		<div className={styles.container}>
			<div className={styles.walkTime}>
				Estimated Walk Time: {walkSeconds} seconds
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
					<div
						key={point.id}
						className={styles.point}
					>
						<div className={styles.icon}>
							{point.thumbnailLink ? (
								<img
									src={point.thumbnailLink}
									className={styles.thumbnail}
								/>
							) : (
								"🚏"
							)}
						</div>
						<div className={styles.details}>
							<h3>{point.title}</h3>
							<p>
								Latitude: {point.lat}, Longitude: {point.lng}
							</p>
							<p>Tags: {point.tags.join(", ")}</p>
							<p>Tours: {point.tours.join(", ")}</p>
						</div>
					</div>
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
			<Button
				variant="contained"
				fullWidth
			>
				Plan Another Trip
			</Button>
		</div>
	);
};

export { CurrentTrip };
