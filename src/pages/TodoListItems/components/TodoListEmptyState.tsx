import { ListBulletsIcon } from "@phosphor-icons/react";

export const TodoListEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <ListBulletsIcon size={56} className="text-gray-300 mb-4" weight="thin" />
      <h3 className="text-lg font-medium text-gray-700 mb-2">No items yet</h3>
      <p className="text-gray-500">Add items using the input field above</p>
    </div>
  );
};
