import { useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TodoListNew = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO api call and
    navigate("/todo-lists");
  };

  return (
    <div className="p-6 mx-auto max-w-md bg-white pt-[20vh]">
      <h1 className="text-2xl font-bold mb-6">Create New To-do List</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            List Name
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter list name"
            required
          />
        </div>

        <Button type="submit" disabled={!name.trim()} className="w-full">
          <CheckCircleIcon size={20} weight="bold" />
          Create Todo List
        </Button>
      </form>
    </div>
  );
};

export default TodoListNew;
