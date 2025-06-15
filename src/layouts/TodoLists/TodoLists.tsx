import TodoListsEmptyState from "./components/TodoListsEmptyState";
import TodoListHeader from "./components/TodoListsHeader";

const TodoLists = () => (
  <div className="p-6">
    <TodoListHeader title="To-do Lists" />
    <TodoListsEmptyState />
    {/* Additional components like TodoListItems can be added here */}
  </div>
);

export default TodoLists;
