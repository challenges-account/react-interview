import { Link } from "react-router";
import { WarningCircleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export const TodoListNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="max-w-md p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <WarningCircleIcon size={64} className="text-red-300" />
          <h1 className="text-2xl font-bold">To-do List Not Found</h1>
          <p className="text-gray-600 mb-6">
            The to-do list you're looking for doesn't exist or has been deleted.
          </p>
          <Button asChild>
            <Link to="/todo-lists">Back to To-do Lists</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
