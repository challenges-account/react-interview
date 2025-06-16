import { useTodoListItems } from "@/api/todoList/items";
import { TodoListItem } from "./TodoListItem";
import { TodoListEmptyState } from "./TodoListEmptyState";
import Spinner from "@/components/ui/spinner";

interface TodoListItemsListProps {
  todoListId: string;
}

export const TodoListItemsList = ({ todoListId }: TodoListItemsListProps) => {
  const { data: items, isLoading, error } = useTodoListItems(todoListId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading items. Please try again.
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <TodoListEmptyState />;
  }

  return (
    <div className="mt-4">
      {items.map((item) => (
        <TodoListItem key={item.id} item={item} todoListId={todoListId} />
      ))}
    </div>
  );
};
