import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { AppRoute } from "./libs/enums/enums.js";
import { Layout } from "./libs/components/components.js";
import {
	Root,
	Information,
	SignIn,
	SignUp,
	Profile,
	Leaderboard,
} from "./pages/pages.js";
import ProtectedRoute from "./protected-route.js";
import { TourPage } from "~/pages/tour-page/tour-page.js";
import { ToursPage } from "~/pages/tours-page/tours-page.js";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					element: <Root />,
					path: AppRoute.ROOT,
				},
				{
					element: <Information />,
					path: AppRoute.PLACE_$ID,
				},
				{
					element: <SignIn />,
					path: AppRoute.SIGN_IN,
				},
				{
					element: <SignUp />,
					path: AppRoute.SIGN_UP,
				},
				{
					element: <Profile />,
					path: AppRoute.PROFILE_$ID,
				},
				{
					element: <TourPage />,
					path: AppRoute.TOUR_$ID,
				},
				{
					element: <ToursPage />,
					path: AppRoute.TOURS,
				},
				{
					element: <ProtectedRoute />,
					children: [
						{
							element: <Leaderboard />,
							path: AppRoute.LEADERBOARD,
						},
						{
							element: <Profile />,
							path: AppRoute.PROFILE,
						},
					],
				},
				{
					element: (
						<Navigate
							to={AppRoute.ROOT}
							replace
						/>
					),
					path: AppRoute.ANY,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export { App };
