import { Modal, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as tripAction } from "~/modules/trips/trips.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import Mapchik from "../../../assets/images/mapchik-jumps-happily.svg";

import styles from "./auth-warning-modal.module.css";

const AuthWarningModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isModalOpen } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const handleForcedClose = () => {
		dispatch(authActions.hideModal());
	};

	const handleAuth = () => {
		navigate(AppRoute.SIGN_IN);
		dispatch(authActions.hideModal());
	};

	const handleAnonymous = () => {
		dispatch(authActions.setIsAnonymousEnabledAllowed());
		dispatch(tripAction.getPlacesDataForUnauth());
	};

	return (
		<Modal
			onClose={handleForcedClose}
			open={isModalOpen}
		>
			<div className={styles.modalContainer}>
				<div className={styles.closeIconContainer}>
					<Close
						className={styles.closeIcon}
						onClick={handleForcedClose}
					/>
				</div>
				<div className={styles.modalContent}>
					<div className={styles.rightSection}>
						<h5 className={styles.header}>Enhance Your User Experience</h5>
						<p>Login in order to:</p>
						<p>🏅 unlock achievements</p>
						<p>📅 track your travel progress</p>
						<p>🏃‍♂️ compete with other users</p>
						<div className={styles.buttonContainer}>
							<Button
								variant="contained"
								color="primary"
								fullWidth
								className={styles.authButton}
								onClick={handleAuth}
							>
								Sign In
							</Button>
							<Button
								variant="outlined"
								color="primary"
								fullWidth
								className={styles.anonymousButton}
								onClick={handleAnonymous}
							>
								Enable Guest Mode
							</Button>
						</div>
						<Button
							variant="text"
							color="error"
							fullWidth
							className={styles.cancelButton}
							onClick={handleForcedClose}
						>
							I'll stick to read-only mode
						</Button>
					</div>
					<div className={styles.leftSection}>
						<img
							src={Mapchik}
							alt="Running Icon"
							className={styles.icon}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export { AuthWarningModal };
