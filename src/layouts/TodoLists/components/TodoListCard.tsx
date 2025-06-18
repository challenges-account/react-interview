import { TrashIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router";

interface TodoListCardProps {
  todoList: TodoList;
  onDeleteClick: () => void;
}

const TodoListCard = ({ todoList, onDeleteClick }: TodoListCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/todo-lists/${todoList.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCardClick();
    }
  };

  return (
    <li
      className="flex justify-between items-center p-4 bg-white rounded-md shadow-sm border border-gray-100 mb-2 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${todoList.name}`}
    >
      <span className="text-gray-700 font-medium">{todoList.name}</span>
      <button
        aria-label="Delete to-do list"
        className="text-gray-400 hover:text-red-500 transition-colors"
        onClick={handleDeleteClick}
      >
        <TrashIcon size={20} weight="bold" />
      </button>
    </li>
  );
};

export default TodoListCard;
