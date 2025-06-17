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
    // Stop propagation to prevent card navigation
    e.stopPropagation();
    onDeleteClick();
  };

  return (
    <div
      className="flex justify-between items-center p-4 bg-white rounded-md shadow-sm border border-gray-100 mb-2 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <span className="text-gray-700 font-medium">{todoList.name}</span>
      <button
        aria-label="Delete to-do list"
        className="text-gray-400 hover:text-red-500 transition-colors"
        onClick={handleDeleteClick}
      >
        <TrashIcon size={20} weight="bold" />
      </button>
    </div>
  );
};

export default TodoListCard;
