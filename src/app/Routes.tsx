import {
  type RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { HomePageLazy } from "@/pages/home-page/Home.page.lazy";
import { AuthPageLazy } from "@/pages/auth-page/Auth.page.lazy";
import { ProfilePageLazy } from "@/pages/profile-page/Profile.page.lazy";
import { MyProfilePageLazy } from "@/pages/my-profile-page/MyProfile.page.lazy";
import { MusicPageLazy } from "@/pages/music-page/Music.page.lazy";
import { SubscriptionPageLazy } from "@/pages/subscription-page/Subscription.page.lazy";
import { AuthorizedLayout } from "./AuthorizedLayout";

const routes: RouteObject[] = [
  {
    element: <AuthorizedLayout />,
    children: [
      {
        element: <HomePageLazy />,
        path: ROUTE_PATHS.HOME,
      },
      {
        element: <AuthPageLazy />,
        path: ROUTE_PATHS.AUTH,
      },
      {
        element: <ProfilePageLazy />,
        path: ROUTE_PATHS.PROFILE,
      },
      {
        element: <MyProfilePageLazy />,
        path: ROUTE_PATHS.MY_PROFILE,
      },
      {
        element: <MusicPageLazy />,
        path: ROUTE_PATHS.MUSIC,
      },
      {
        element: <SubscriptionPageLazy />,
        path: ROUTE_PATHS.SUBSCRIPTION,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export const Routes = () => <RouterProvider router={router} />;
