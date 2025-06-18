import {
  useUpdateTodoListItem,
  useDeleteTodoListItem,
} from "@/api/todoList/items";
import { TrashIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface TodoListItemProps {
  item: TodoListItem;
  todoListId: string;
}

export const TodoListItem = ({ item, todoListId }: TodoListItemProps) => {
  const { mutate: updateItem, isPending: isToggling } = useUpdateTodoListItem(
    todoListId,
    item.id,
  );
  const { mutate: deleteItem, isPending: isDeleting } =
    useDeleteTodoListItem(todoListId);
  const handleToggle = (checked: boolean) => {
    updateItem({
      name: item.name,
      completed: checked,
    });
  };

  const handleDelete = () => {
    deleteItem(item.id);
  };

  return (
    <li className="flex items-center justify-between py-3 px-1 border-b border-gray-100 group">
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          id={`checkbox-${item.id}`}
          checked={item.completed}
          onCheckedChange={(checked) => handleToggle(checked as boolean)}
          disabled={isToggling}
          className={cn(isToggling && "opacity-50")}
        />
        <label
          htmlFor={`checkbox-${item.id}`}
          className={cn(
            "text-base text-gray-700 cursor-pointer flex-1",
            item.completed && "line-through text-gray-400",
          )}
        >
          {item.name}
        </label>
      </div>

      <button
        onClick={handleDelete}
        aria-label="Delete item"
        disabled={isDeleting}
        className={cn(
          "text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100",
          isDeleting && "opacity-50 cursor-not-allowed",
        )}
      >
        <TrashIcon size={18} weight="bold" />
      </button>
    </li>
  );
};
