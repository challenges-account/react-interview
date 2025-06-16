import { useState } from "react";
import { useUpdateTodoList } from "@/api/todoList";
import Spinner from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { PencilSimpleIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";

interface TodoListTitleProps {
  className?: string;
  todoList: TodoList | undefined;
  isLoading: boolean;
  todoListId: string;
}

export const TodoListTitle = ({
  className,
  todoList,
  isLoading,
  todoListId,
}: TodoListTitleProps) => {
  const fallbackName = "Todo List";
  const updateTodoList = useUpdateTodoList(todoListId);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");

  const startEditing = () => {
    setEditedName(todoList?.name || fallbackName);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveChanges = () => {
    if (!editedName.trim()) return;

    updateTodoList.mutate(
      { name: editedName.trim() },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveChanges();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  if (isLoading) {
    return (
      <h1
        className={cn(
          "flex items-center gap-2 text-4xl font-extrabold",
          className,
        )}
      >
        <span className="text-gray-400">{fallbackName}</span>
        <Spinner size="sm" />
      </h1>
    );
  }

  if (isEditing) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="text-2xl font-bold h-auto py-1 px-2"
        />
        <button
          onClick={saveChanges}
          className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
          aria-label="Save changes"
        >
          <CheckIcon size={20} weight="bold" />
        </button>
        <button
          onClick={cancelEditing}
          className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
          aria-label="Cancel editing"
        >
          <XIcon size={20} weight="bold" />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <h1 className="text-4xl font-extrabold">
        {todoList?.name || fallbackName}
      </h1>
      <button
        onClick={startEditing}
        className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        aria-label="Edit title"
      >
        <PencilSimpleIcon size={20} weight="bold" />
      </button>
    </div>
  );
};
