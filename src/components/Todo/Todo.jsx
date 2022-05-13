import {CheckIcon, PencilIcon, TrashIcon} from "@heroicons/react/solid";
import moment from "moment";
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../../state/Provider";
import styles from "./Todo.module.css";

export const Todo = ({todo}) => {
  const {editTodoItem, removeTodoItem, markAsCompleted} = useContext(Context);

  const [isReadOnly, setIsReadOnly] = useState(true);
  const [label, setLabel] = useState(todo.label);

  const focusRef = useRef();

  const handleUpdate = evt => {
    evt.preventDefault();
    editTodoItem(todo.id, {label});
    setIsReadOnly(true);
  };

  const handleDelete = evt => {
    evt.preventDefault();
    removeTodoItem(todo.id);
  };

  useEffect(() => {
    if (!isReadOnly) {
      focusRef.current && focusRef.current.focus();
    }

    if (todo.completed) {
      setIsReadOnly(true);
    }
  }, [isReadOnly, todo.completed]);

  return (
    <li
      className={`${styles.container} ${
        todo.completed ? styles.completed : ""
      }`}
    >
      <button
        className={`${styles["mark-as-completed"]} ${
          todo.completed ? styles.completed : ""
        }`}
        onClick={() => markAsCompleted(todo.id)}
      >
        <CheckIcon className="w-5 h-5" />
      </button>

      <form onSubmit={handleUpdate} className="mr-auto">
        <input
          required
          disabled={isReadOnly}
          ref={focusRef}
          onChange={evt => setLabel(evt.target.value)}
          className={styles["label-or-input"]}
          value={label}
        />
      </form>

      {todo.updatedAt && (
        <span className="text-xs opacity-40 italic">
          edited {moment(todo.updatedAt).fromNow()}
        </span>
      )}

      {isReadOnly ? (
        <button
          disabled={todo.completed}
          onClick={() => setIsReadOnly(false)}
          className="bg-orange-400 p-2 rounded disabled:bg-gray-300 disabled:mix-blend-multiply"
        >
          <PencilIcon className="text-white w-4 h-4" />
        </button>
      ) : (
        <button onClick={handleUpdate} className="bg-green-400 p-2 rounded">
          <CheckIcon className="text-white w-4 h-4" />
        </button>
      )}

      <button onClick={handleDelete} className="bg-red-500 p-2 rounded">
        <TrashIcon className="text-white w-4 h-4" />
      </button>
    </li>
  );
};
