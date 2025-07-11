import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router";
import RootLayout from "@/layouts/RootLayout";
import Welcome from "@/pages/TodoLists/EmptyState/Welcome";
import TodoListItems from "@/pages/TodoListItems/TodoListItems";
import TodoListNew from "./pages/TodoLists/New/TodoListNew";
import { RouterErrorBoundary } from "@/components/error-handling/RouterErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <RouterErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/todo-lists" replace />,
      },

      {
        path: "todo-lists",
        Component: Outlet,
        children: [
          { index: true, Component: Welcome },
          { path: "new", Component: TodoListNew },
          {
            path: ":todoListId",
            Component: TodoListItems,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/todo-lists" replace />,
      },
    ],
  },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
