import { useParams } from "react-router";
import { TodoListTitle } from "./components/TodoListTitle";
import { TodoListNewItemForm } from "./components/TodoListNewItemForm";
import { TodoListItemsList } from "./components/TodoListItemsList";
import { TodoListNotFound } from "./components/TodoListNotFound";
import { useTodoList } from "@/api/todoList";
import Spinner from "@/components/ui/spinner";

const TodoListItems = () => {
  const { todoListId } = useParams();

  if (!todoListId) {
    return <div className="p-4 text-red-500">No to-do list ID provided.</div>;
  }

  const { data: todoList, isLoading, isError } = useTodoList(todoListId);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return <TodoListNotFound />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <TodoListTitle
        className="mb-6"
        todoList={todoList}
        isLoading={isLoading}
        todoListId={todoListId}
      />
      <TodoListNewItemForm todoListId={todoListId} />
      <TodoListItemsList todoListId={todoListId} />
    </div>
  );
};

export default TodoListItems;
