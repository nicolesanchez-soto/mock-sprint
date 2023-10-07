import "../styles/App.css";
import REPL from "./REPL";

/**
 * This is the highest level component!
 */
function App() {
  console.log("hello");
  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
      </p>
      <REPL />
    </div>
  );
}

export default App;
