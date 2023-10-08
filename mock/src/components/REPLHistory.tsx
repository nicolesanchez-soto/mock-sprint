import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: string[];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((elem) => (
        <p>{elem}</p>
      ))}
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
    </div>
  );
}
