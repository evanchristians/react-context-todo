import {PlusCircleIcon} from "@heroicons/react/solid";
import {useContext} from "react";
import {Context} from "../state/Provider";
import {Input} from "./Input";

export const TodoForm = props => {
  const {addTodoItem} = useContext(Context);

  const handleSubmit = evt => {
    evt.preventDefault();
    const {label} = Object.fromEntries(new FormData(evt.target));
    addTodoItem(label);
    evt.target.reset();
  };

  return (
    <form {...props} className="max-w-lg flex" onSubmit={handleSubmit}>
      <Input
        required
        name="label"
        placeholder="Please enter a task description"
      />
      <button
        className="bg-blue-600 text-sm text-white rounded px-2 py-1.5 ml-2"
        type="submit"
      >
        <PlusCircleIcon className="text-white w-4 h-4" />
      </button>
    </form>
  );
};
