// Importing necessary styles and components
import "../styles/App.css";
import REPL from "./REPL";

/**
 * App Component
 *
 * This is the root component of the application.
 * It renders the main layout and embeds the REPL component.
 *
 * @returns {React.Component} - Rendered component.
 */
function App() {
  return (
    <div className="App">
      {/* Header section */}
      <header className="App-header">
        <h1>Mock</h1>
      </header>

      {/* REPL Component for user interaction */}
      <REPL />
    </div>
  );
}

// Exporting App component for other components
export default App;
