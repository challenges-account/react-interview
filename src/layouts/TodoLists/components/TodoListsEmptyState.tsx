import { ClipboardIcon } from "@phosphor-icons/react";

const TodoListsEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-full">
      <ClipboardIcon size={56} className="text-gray-300 mb-4" weight="thin" />
      <h3 className="text-lg font-medium text-gray-700 mb-2">No To-do Lists</h3>
      <p className="text-gray-500 mb-6">
        Todo lists will be displayed here when created.
      </p>
    </div>
  );
};

export default TodoListsEmptyState;
