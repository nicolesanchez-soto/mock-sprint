// Importing necessary styles
import "../styles/main.css";

// Importing required types from React library
import { Dispatch, SetStateAction } from "react";

/**
 * Props definition for the ControlledInput component.
 *
 * @property {string} value - The current value of the input.
 * @property {Dispatch<SetStateAction<string>>} setValue - Function to update the value of the input.
 * @property {string} ariaLabel - Accessibility label for the input.
 */
interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * ControlledInput Component
 *
 * A controlled input component ensures that React manages the state of the input.
 * This component acts as a wrapper around a regular input box but with state control.
 *
 * @param {ControlledInputProps} props - Properties passed down to this component.
 * @returns {React.Component} - Rendered controlled input component.
 */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      // Testing identifier for the input
      data-testid="input"
      // Setting the type of input as "text"
      type="text"
      // Applying the styling class for the input
      className="repl-command-box"
      // Value and placeholder for the input
      value={value}
      placeholder="Enter command here!"
      // Event handler to update the value state whenever the input changes
      onChange={(ev) => setValue(ev.target.value)}
      // Accessibility label for the input
      aria-label={ariaLabel}
    />
  );
}
