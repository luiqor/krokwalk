import { Navigate, Outlet } from "react-router-dom";

import { AppRoute } from "./libs/enums/app-route.enum.js";
import { storage, StorageKey } from "./modules/storage/storage.js";

const ProtectedRoute = () => {
	const token = storage.get<string>(StorageKey.TOKEN);

	if (!token) {
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
