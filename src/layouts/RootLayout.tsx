import { Outlet } from "react-router";
import TodoLists from "@/layouts/TodoLists/TodoLists";

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-96 bg-gray-100">
        <TodoLists />
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
