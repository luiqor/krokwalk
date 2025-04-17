import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { AppRoute } from "./libs/enums/enums.js";
import { Layout } from "./libs/components/components.js";
import { Root } from "./pages/root/root.js";
import { Information } from "./pages/information/information.js";
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
					element: <ToursPage />,
					path: AppRoute.TOURSPAGE,
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
