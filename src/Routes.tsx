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

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
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
    ],
  },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
