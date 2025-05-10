import { Close } from "@mui/icons-material";
import { Modal } from "@mui/material";

import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as tripAction } from "~/modules/trips/trips.js";
import { actions as locationAction } from "~/modules/location/location.js";

import styles from "./achievement-congrats-modal.module.css";

const AchievementCongratsModal: React.FC = () => {
	const { newAchievements } = useAppSelector((state) => state.trips);
	const dispatch = useAppDispatch();

	const isModalOpen = newAchievements.length > 0;

	const handleModalClose = () => {
		dispatch(tripAction.shiftNewAchievements());

		if (newAchievements.length <= 1) {
			dispatch(locationAction.resetLocationData());
			dispatch(tripAction.resetTripData());
		}
	};

	if (newAchievements.length === 0) {
		return null;
	}

	const currentAchievement = newAchievements[0];

	return (
		<Modal
			onClose={handleModalClose}
			open={isModalOpen}
		>
			<div className={styles.modalContainer}>
				<div className={styles.closeIconContainer}>
					<Close
						className={styles.closeIcon}
						onClick={handleModalClose}
					/>
				</div>
				<div className={styles.modalContent}>
					<div>
						<h1>Congratulations!</h1>
						<h4>
							{`You have earned a new achievement for reaching ${currentAchievement.targetCount} ${currentAchievement.achievementEvent}`}
							!
						</h4>
					</div>
					<div className={styles.achievementBox}>
						<img
							src={currentAchievement.iconLink}
							alt={currentAchievement.title}
							className={styles.achievementImage}
						/>
						<h1>{currentAchievement.title}</h1>
						<p>{currentAchievement.description}</p>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export { AchievementCongratsModal };
