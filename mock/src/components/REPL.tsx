import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

export default function REPL() {
  const [history, setHistory] = useState<JSX.Element[]>([]);

  const addToHistory = (content: JSX.Element) => {
    setHistory((prevHistory) => [...prevHistory, content]);
  };

  return (
    <div className="repl">
      <REPLHistory history={history} />
      <hr />
      <REPLInput addToHistory={addToHistory} />
    </div>
  );
}
