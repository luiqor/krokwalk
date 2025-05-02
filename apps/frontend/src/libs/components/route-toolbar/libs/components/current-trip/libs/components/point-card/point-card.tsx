import { CreateTripPlace, ValueOf, VisitStatus } from "shared";
import { CheckCircleRounded, RadioButtonUnchecked } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { actions as tripAction } from "~/modules/trips/trips.js";
import { useAppDispatch, useGeolocation } from "~/libs/hooks/hooks.js";

import styles from "../../../current-trip.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { PopupWarning } from "~/libs/components/components.js";

const PointCard: React.FC<{ point: CreateTripPlace }> = ({ point }) => {
	const { id, title, lat, lng, tags, tours, thumbnailLink, visitStatus } =
		point;

	const dispatch = useAppDispatch();
	const {
		latitude: currentLat,
		longitude: currentLng,
		error,
		hasError,
	} = useGeolocation();
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	const handleStatusChange = (
		pointId: string,
		visitStatus: ValueOf<typeof VisitStatus>
	) => {
		if (visitStatus === VisitStatus.CONFIRMED) {
			if (!currentLat || !currentLng) {
				setIsPopupOpen(true);
				return;
			}

			dispatch(
				tripAction.confirmPlaceVisit({
					placeId: pointId,
					lat: currentLat,
					lng: currentLng,
				})
			);

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
		<>
			{isPopupOpen && (
				<PopupWarning
					isOpen={isPopupOpen}
					onClose={handleClosePopup}
				/>
			)}
			<div
				key={id}
				className={clsx(
					styles.point,
					visitStatus && styles[`${visitStatus}PointInfo`]
				)}
			>
				<div className={styles.pointInfo}>
					<div>
						<div className={styles.icon}>
							{thumbnailLink ? (
								<img
									src={thumbnailLink}
									className={styles.thumbnail}
								/>
							) : (
								"🚏"
							)}
						</div>
						<div className={styles.details}>
							<h3>{title}</h3>
							<p>
								Latitude: {lat}, Longitude: {lng}
							</p>
							<p>Tags: {tags.join(", ")}</p>
							<p>Tours: {tours.join(", ")}</p>
						</div>
					</div>
					<div className={styles.checkboxContainer}>
						{visitStatus === VisitStatus.UNVISITED || visitStatus === null ? (
							<RadioButtonUnchecked className={styles.defaultCheckbox} />
						) : (
							<CheckCircleRounded
								className={
									visitStatus === VisitStatus.CONFIRMED
										? styles.confirmedCheckbox
										: styles.defaultCheckbox
								}
							/>
						)}
					</div>
				</div>
				<ToggleButtonGroup
					fullWidth
					value={visitStatus}
					size="small"
					exclusive
					onChange={(event, newStatus) => handleStatusChange(id, newStatus)}
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
		</>
	);
};

export { PointCard };