import {
  type RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { HomePageLazy } from "@/pages/home-page/Home.page.lazy";

const routes: RouteObject[] = [
  {
    element: <HomePageLazy />,
    path: ROUTE_PATHS.HOME,
  },
];

const router = createBrowserRouter(routes);

export const Routes = () => <RouterProvider router={router} />;
