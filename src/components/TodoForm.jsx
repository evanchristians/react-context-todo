import {PlusCircleIcon} from "@heroicons/react/solid";
import {useContext, useState} from "react";
import {validateTodo} from "../domain/todos";
import {Context} from "../state/Provider";
import {Input} from "./Input";

export const TodoForm = props => {
  const {addTodoItem} = useContext(Context);
  const [errors, setErrors] = useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();
    const {label} = Object.fromEntries(new FormData(evt.target));

    const output = validateTodo({label});
    setErrors(output.errors);

    if (output.errors) return;

    addTodoItem(label);
    evt.target.reset();
  };

  return (
    <form
      {...props}
      className="max-w-lg flex items-start"
      onSubmit={handleSubmit}
    >
      <Input
        errors={errors ? errors : undefined}
        name="label"
        placeholder="Please enter a task description"
      />
      <button
        className="bg-blue-600 text-sm text-white rounded px-2 py-1.5 ml-2"
        type="submit"
      >
        <PlusCircleIcon className="text-white w-5 h-5" />
      </button>
    </form>
  );
};
