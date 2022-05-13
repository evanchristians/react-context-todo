import {createContext, useReducer} from "react";
import {actions, initialState} from "./config";
import {reducer} from "./reducer";

export const Context = createContext();

export const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    todoList: state.todoList,
    addTodoItem: todoItemLabel => {
      dispatch({type: actions.ADD_TODO_ITEM, todoItemLabel});
    },
    editTodoItem: (todoItemId, todoItemPayload) => {
      dispatch({type: actions.EDIT_TODO_ITEM, todoItemId, todoItemPayload});
    },
    removeTodoItem: todoItemId => {
      dispatch({type: actions.REMOVE_TODO_ITEM, todoItemId});
    },
    markAsCompleted: todoItemId => {
      dispatch({type: actions.TOGGLE_COMPLETED, todoItemId});
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
