import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AppRoute } from "./libs/enums/enums.js";
import { Layout } from "./libs/components/components.js";
import { Root } from "./pages/root/root.js";
import { Information } from "./pages/information/information.js";

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
          element: <Information/>,
          path: AppRoute.INFORMATION,
        },
        {
          element: <Navigate to={AppRoute.ROOT} replace />,
          path: AppRoute.ANY,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export { App };
