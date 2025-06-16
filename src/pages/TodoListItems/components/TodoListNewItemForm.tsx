import { useCreateTodoListItem } from "@/api/todoList/items";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperPlaneRightIcon } from "@phosphor-icons/react";
import { useState } from "react";

interface TodoListNewItemFormProps {
  todoListId: string;
}

export const TodoListNewItemForm = ({
  todoListId,
}: TodoListNewItemFormProps) => {
  const [newItemName, setNewItemName] = useState("");
  const { mutate: createItem, isPending } = useCreateTodoListItem(todoListId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newItemName.trim()) return;

    createItem(
      { name: newItemName.trim() },
      {
        onSuccess: () => {
          setNewItemName("");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 relative">
      <div className="flex gap-2">
        <Input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add a new item..."
          disabled={isPending}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={!newItemName.trim() || isPending}
          size="default"
          className="shrink-0"
        >
          <PaperPlaneRightIcon size={18} weight="bold" />
          <span className="sr-only">Add item</span>
        </Button>
      </div>
    </form>
  );
};
