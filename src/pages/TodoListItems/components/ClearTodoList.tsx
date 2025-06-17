import { useState } from "react";
import { useDeleteAllTodoListItems } from "@/api/todoList/items";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { TrashIcon } from "@phosphor-icons/react";

interface ClearTodoListProps {
  todoListId: string;
}

export const ClearTodoList = ({ todoListId }: ClearTodoListProps) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeleteAllTodoListItems(todoListId);

  const handleConfirm = () => {
    mutate(undefined, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        disabled={isPending}
        aria-label="Clear all items in this todo list"
        className="flex items-center gap-2"
      >
        <TrashIcon size={16} weight="bold" />
        Clear Todo List
      </Button>
      <ConfirmationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title="Clear all items?"
        confirmLabel={isPending ? "Clearing..." : "Clear items"}
        cancelLabel="Cancel"
        isLoading={isPending}
      >
        This will permanently delete all items in this todo list. This action
        cannot be undone.
      </ConfirmationModal>
    </>
  );
};
