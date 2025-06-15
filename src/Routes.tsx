import { createBrowserRouter, RouterProvider } from "react-router";

import App from "@/App";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
