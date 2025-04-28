import { CreateTripPlace, ValueOf, VisitStatus } from "shared";
import { CheckCircleRounded, RadioButtonUnchecked } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { actions as tripAction } from "~/modules/trips/trips.js";
import { useAppDispatch } from "~/libs/hooks/hooks.js";

import styles from "../../../current-trip.module.css";

const PointCard: React.FC<{ point: CreateTripPlace }> = ({ point }) => {
	const dispatch = useAppDispatch();

	const handleStatusChange = (
		pointId: string,
		visitStatus: ValueOf<typeof VisitStatus>
	) => {
		if (visitStatus === VisitStatus.CONFIRMED) {
			// dispatch(
			// 	tripAction.confirmPlaceVisit({
			// 		placeId: pointId,
			// 		lat: "",
			// 		lng: "",
			// 	})
			// );

			return;
		}

		dispatch(
			tripAction.updatePlaceVisitStatus({
				visitStatus: visitStatus,
				placeId: pointId,
			})
		);
	};

	return (
		<div
			key={point.id}
			className={styles.point}
		>
			<div className={styles.pointInfo}>
				<div>
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
				<div className={styles.checkboxContainer}>
					{point.visitStatus === VisitStatus.UNVISITED ||
					point.visitStatus === null ? (
						<RadioButtonUnchecked className={styles.defaultCheckbox} />
					) : (
						<CheckCircleRounded
							className={
								point.visitStatus === VisitStatus.CONFIRMED
									? styles.confirmedCheckbox
									: styles.defaultCheckbox
							}
						/>
					)}
				</div>
			</div>
			<ToggleButtonGroup
				fullWidth
				key={point.visitStatus}
				value={point.visitStatus ?? VisitStatus.UNVISITED}
				size="small"
				exclusive
				onChange={(event, newStatus) => handleStatusChange(point.id, newStatus)}
				aria-label="visit status"
			>
				<ToggleButton
					value={VisitStatus.UNVISITED}
					aria-label="unvisited"
				>
					Mark as Unvisited
				</ToggleButton>
				<ToggleButton
					value={VisitStatus.MARKED}
					aria-label="marked"
				>
					Mark as Visited
				</ToggleButton>
				<ToggleButton
					value={VisitStatus.CONFIRMED}
					aria-label="confirmed"
				>
					Confirm Visit
				</ToggleButton>
			</ToggleButtonGroup>
		</div>
	);
};

export { PointCard };