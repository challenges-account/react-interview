import LinkButton from "@/components/ui/link-button";
import { ClipboardTextIcon, PlusCircleIcon } from "@phosphor-icons/react";

const Welcome = () => (
  <div className="flex flex-col items-center justify-start h-full pt-[20vh] px-8 text-center">
    <div className="flex flex-col items-center">
      <ClipboardTextIcon
        size={64}
        className="text-gray-300 mb-4"
        weight="thin"
      />
      <h2 className="text-xl font-medium text-gray-700 mb-2">
        Welcome to To-do Lists App!
      </h2>
      <p className="text-gray-600 max-w-md">
        Please select a list from the left side menu or create a new one to
        continue.
      </p>
      <LinkButton
        to="/todo-lists/new"
        icon={PlusCircleIcon}
        label="Add new to-do list"
        className="mt-6"
      />
    </div>
  </div>
);

export default Welcome;
