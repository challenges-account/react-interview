import { Outlet } from "react-router";
import TodoLists from "@/layouts/TodoLists/TodoLists";

const RootLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <aside className="w-96 bg-gray-100">
        <TodoLists />
      </aside>
      <main className="flex-1 bg-white p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
