import {getFieldErrors} from "../../app/validation";
import styles from "./Input.module.css";

export const Input = props => {
  const fieldErrors = getFieldErrors(props.name, props.errors);

  return (
    <div className="w-full">
      <input className={styles.input} {...props} />
      {props.errors && (
        <ul className="ml-6 mt-2">
          {fieldErrors &&
            fieldErrors.map(({message, field}, key) => (
              <li
                className="text-red-500 text-xs list-disc"
                key={`error-${field}-${key}`}
              >
                {message}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
