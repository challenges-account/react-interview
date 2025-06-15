import { TrashIcon } from "@phosphor-icons/react";
import { Link } from "react-router";

interface TodoListCardProps {
  todoList: TodoList;
}

const TodoListCard = ({ todoList }: TodoListCardProps) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-md shadow-sm border border-gray-100 mb-2 hover:shadow-md transition-shadow">
      <Link
        to={`/todo-lists/${todoList.id}`}
        className="text-gray-700 hover:text-blue-600 font-medium"
      >
        {todoList.name}
      </Link>
      <button
        aria-label="Delete todo list"
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <TrashIcon size={20} weight="bold" />
      </button>
    </div>
  );
};

export default TodoListCard;
