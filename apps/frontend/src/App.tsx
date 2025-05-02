import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { AppRoute } from "./libs/enums/enums.js";
import { Layout } from "./libs/components/components.js";
import { Root, Information, SignIn, SignUp } from "./pages/pages.js";
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
					path: AppRoute.INFORMATION,
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
					element: <TourPage />,
					path: AppRoute.TOURPAGE,
				},
				{
					element: <ToursPage />,
					path: AppRoute.TOURSPAGE,
				},
				{
					element: <ProtectedRoute />,
					children: [
						// Add user-logged-in routes here
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
