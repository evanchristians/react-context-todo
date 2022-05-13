import {useContext} from "react";
import {Todo} from "./components/Todo";
import {TodoForm} from "./components/TodoForm";
import {Context} from "./state/Provider";

function App() {
  const state = useContext(Context);

  return (
    <main className="flex flex-col gap-4 p-6">
      <TodoForm />
      <ul className="max-w-lg flex flex-col gap-2">
        {state.todoList.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </main>
  );
}

export default App;
