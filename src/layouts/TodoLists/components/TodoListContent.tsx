import Spinner from "@/components/ui/spinner";
import TodoListCard from "./TodoListCard";
import TodoListsEmptyState from "./TodoListsEmptyState";
import { useTodoLists } from "@/api/todoList";

export function TodoListContent() {
  const { data: todoLists, isLoading, error } = useTodoLists();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 gap-3">
        <Spinner />
      </div>
    );
  }

  if (error) {
    // TODO improve error
    return (
      <div className="p-4 text-red-500">
        Error loading todo lists. Please try again.
      </div>
    );
  }

  if (!todoLists || todoLists.length === 0) {
    return <TodoListsEmptyState />;
  }

  return (
    <div className="mt-6">
      {todoLists.map((todoList) => (
        <TodoListCard key={todoList.id} todoList={todoList} />
      ))}
    </div>
  );
}
