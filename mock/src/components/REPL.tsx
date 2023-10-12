import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/**
 * REPL (Read-Eval-Print Loop) Component.
 * This component serves as the main interface for the REPL.
 * It handles the history of executed commands and their outputs.
 * Users can input commands and see the results.
 */
export default function REPL() {
  // State to store the history of REPL interactions.
  const [history, setHistory] = useState<JSX.Element[]>([]);

  /**
   * Function to add new content to the REPL history.
   * @param content - The new content (e.g., a command or output) to add to the history.
   */
  const addToHistory = (content: JSX.Element) => {
    setHistory((prevHistory) => [...prevHistory, content]);
  };

  return (
    <div className="repl">
      {/* Display the history of REPL interactions */}
      <REPLHistory history={history} />
      <hr />
      {/* Input area for users to enter their commands */}
      <REPLInput addToHistory={addToHistory} />
    </div>
  );
}
