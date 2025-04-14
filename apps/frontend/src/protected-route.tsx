import { Navigate, Outlet } from "react-router-dom";

import { AppRoute } from "./libs/enums/app-route.enum.js";
import { useAppSelector } from "./libs/hooks/hooks.js";

const ProtectedRoute = () => {
	const { user } = useAppSelector((state) => state.auth);

	if (!user) {
		return (
			<Navigate
				to={AppRoute.SIGN_IN}
				replace
			/>
		);
	}

	return <Outlet />;
};

export default ProtectedRoute;
