import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const location = useLocation();

  const openDeleteModal = (todoList: TodoList) => {
    setTodoListToDelete(todoList);
  };

  const closeDeleteModal = () => {
    setTodoListToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (!todoListToDelete) return;

    const isViewingDeletedList = location.pathname.includes(
      `/todo-lists/${todoListToDelete.id}`,
    );

    mutate(todoListToDelete.id, {
      onSuccess: () => {
        closeDeleteModal();

        if (isViewingDeletedList) {
          navigate("/todo-lists");
        }
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
      <ul className="mt-6 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-4">
        {todoLists.map((todoList) => (
          <TodoListCard
            key={todoList.id}
            todoList={todoList}
            onDeleteClick={() => openDeleteModal(todoList)}
          />
        ))}
      </ul>

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
