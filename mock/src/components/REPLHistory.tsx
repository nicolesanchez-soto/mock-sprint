import "../styles/main.css";

interface REPLHistoryProps {
  history: JSX.Element[];
}

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div
      className="repl-history"
      style={{ maxHeight: "300px", overflowY: "scroll" }}
    >
      {props.history}
    </div>
  );
}
