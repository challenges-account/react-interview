import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import TodoListCard from "./TodoListCard";
import TodoListsEmptyState from "./TodoListsEmptyState";
import { useDeleteTodoList, useTodoLists } from "@/api/todoList";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

export function TodoListContent() {
  const { data: todoLists, isLoading, error } = useTodoLists();
  const { mutate, isPending } = useDeleteTodoList();
  const [todoListToDelete, setTodoListToDelete] = useState<TodoList | null>(
    null,
  );

  const openDeleteModal = (todoList: TodoList) => {
    setTodoListToDelete(todoList);
  };

  const closeDeleteModal = () => {
    setTodoListToDelete(null);
  };

  // TODO improve error handling
  const handleDeleteConfirm = () => {
    if (!todoListToDelete) return;

    mutate(todoListToDelete.id, {
      onSuccess: () => {
        closeDeleteModal();
      },
    });
  };

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
        Error loading to-do lists. Please try again.
      </div>
    );
  }

  if (!todoLists || todoLists.length === 0) {
    return <TodoListsEmptyState />;
  }

  return (
    <>
      <div className="mt-6 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-4">
        {todoLists.map((todoList) => (
          <TodoListCard
            key={todoList.id}
            todoList={todoList}
            onDeleteClick={() => openDeleteModal(todoList)}
          />
        ))}
      </div>

      {todoListToDelete && (
        <ConfirmationModal
          isOpen={!!todoListToDelete}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          title={`Are you sure you want to delete ${todoListToDelete.name}?`}
          isLoading={isPending}
        >
          <p className="text-gray-600">
            This action cannot be undone. This will permanently delete the todo
            list and all of its associated items.
          </p>
        </ConfirmationModal>
      )}
    </>
  );
}
