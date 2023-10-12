// Import necessary modules from their respective packages
import React from "react"; // Import the React library
import ReactDOM from "react-dom/client"; // Import the ReactDOM library from its client subfolder
import "./styles/index.css"; // Import global styles for the application
import App from "./components/App"; // Import the main App component from the components folder

// Create a concurrent root for React's concurrent mode. This is a part of React's
// newer, experimental API to allow for concurrent rendering.
// ReactDOM.createRoot creates a root on the provided DOM node (`#root` in this case).
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement // Target the DOM element with the id 'root' and assert it as an HTMLElement
);

// Render the main App component inside React's StrictMode, which checks for potential
// problems in the app during development.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
