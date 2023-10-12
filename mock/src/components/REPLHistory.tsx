import "../styles/main.css";

interface REPLHistoryProps {
  /** An array of JSX elements representing the history of REPL interactions. */
  history: JSX.Element[];
}

/**
 * REPLHistory Component.
 * This component displays the history of commands and their outputs
 * in the REPL interface.
 *
 * @param props - Contains the history of REPL interactions.
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div
      // Identifier for testing purposes
      data-testid="repl-history"
      // Styling class for the history display
      className="repl-history"
      // Limiting the height and allowing vertical scrolling for long histories
      style={{ maxHeight: "300px", overflowY: "scroll" }}
    >
      {/* Rendering the history */}
      {props.history}
    </div>
  );
}
