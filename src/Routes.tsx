import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router";
import RootLayout from "@/layouts/RootLayout";
import TodoListsEmptyState from "@/pages/TodoLists/TodoListsEmptyState";
import TodoListItems from "@/pages/TodoListItems/TodoListItems";

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
          { index: true, Component: TodoListsEmptyState },
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
