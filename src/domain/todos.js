import {createValidator as cv, validate} from "../app/validation";

export const validateTodo = validate(
  cv("label", val => val.length, "Task description cannot be empty."),
  cv(
    "label",
    val => /^[a-zA-Z0-9]/.test(val),
    "Task description cannot contain special characters.",
  ),
);
