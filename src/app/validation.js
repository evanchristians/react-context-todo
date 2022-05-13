import {compose} from "../lib/utils";

export const createValidator = (name, test, message) => input => {
  const value = input[name];

  const error = test(value)
    ? null
    : {
        field: name,
        message,
      };

  const mergedErrors = input._errors ? [...input._errors, error] : [error];

  return {
    ...input,
    ...(error && {
      _errors: mergedErrors,
    }),
  };
};

export const validate =
  (...rules) =>
  input => {
    const output = compose(...rules)(input);

    return {errors: output._errors ?? false};
  };

export const getFieldErrors = (name, errors) =>
  errors ? errors.filter(error => error.field === name) : false;
