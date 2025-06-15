import TodoListHeader from "./components/TodoListsHeader";
import { TodoListContent } from "./components/TodoListContent";

const TodoLists = () => {
  return (
    <div className="p-6">
      <TodoListHeader title="To-do Lists" />
      <TodoListContent />
    </div>
  );
};

export default TodoLists;
