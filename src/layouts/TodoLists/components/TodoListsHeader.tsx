import { PlusCircleIcon } from "@phosphor-icons/react";
import LinkButton from "@/components/ui/link-button";

interface TodoListHeaderProps {
  title: string;
}

const TodoListHeader = ({ title }: TodoListHeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <LinkButton to="/todo-lists/new" icon={PlusCircleIcon} />
    </header>
  );
};

export default TodoListHeader;
