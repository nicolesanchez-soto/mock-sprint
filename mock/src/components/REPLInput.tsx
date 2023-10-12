import "../styles/main.css";
import { useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { cmds } from "./mockedJson";
import { parsedCSV, parsedCSV2, oneColumn } from "./mockedData";
import {
  oneColumnCSVResults,
  riStateCountyCSVResults,
  simpleCSVResults,
} from "./mockedResults";

/**
 * Props for the REPLInput component.
 * @interface
 * @property {function} addToHistory - Function to add command output to history.
 */
interface REPLInputProps {
  addToHistory: (command: JSX.Element) => void;
}

// Boolean to determine the mode: brief or verbose.
let brief: boolean = true;

// A mapping of file names to their parsed CSV data.
const dataMap = new Map([
  ["simple.csv", parsedCSV],
  ["ri_state_county.csv", parsedCSV2],
  ["one_column.csv", oneColumn],
]);

// The currently loaded CSV data.
let currentData: string[][] | null = null;

// The results map for the currently loaded CSV.
let currentResultsMap: Map<string, string[][]> = new Map();

/**
 * The main REPLInput component.
 * This component handles the input of REPL commands and provides output.
 * @param {REPLInputProps} props - The props for the component.
 * @returns {JSX.Element}
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  /**
   * Handles the logic when the user submits a command.
   * Based on the command string, this function determines which operation to execute.
   */
  function handleClick() {
    // If the user wants to switch between 'brief' and 'verbose' modes.
    if (commandString === "mode") {
      brief = !brief;
      props.addToHistory(
        <p>{brief ? "Switched to brief mode" : "Switched to verbose mode"}</p>
      );
    }
    // If the user wants to load a file.
    else if (commandString.startsWith("load_file")) {
      const path = commandString.split(" ")[1];
      currentData = dataMap.get(path) || null;

      // Assign the appropriate results map based on the loaded CSV.
      if (currentData) {
        if (path === "simple.csv") {
          currentResultsMap = simpleCSVResults;
        } else if (path === "ri_state_county.csv") {
          currentResultsMap = riStateCountyCSVResults;
        } else if (path === "one_column.csv") {
          currentResultsMap = oneColumnCSVResults;
        }
      }

      // Output the result of the load command.
      if (currentData) {
        if (brief) {
          props.addToHistory(<p>{`Loaded data from ${path}`}</p>);
        } else {
          props.addToHistory(
            <>
              <p>{`Command: ${commandString}`}</p>
              <p>{`Output: Loaded data from ${path}`}</p>
            </>
          );
        }
      } else {
        props.addToHistory(<p>{"Invalid file path provided"}</p>);
      }
    }
    // If the user wants to view the currently loaded CSV.
    else if (commandString === "view") {
      if (currentData) {
        const table = createTable(currentData);
        if (brief) {
          props.addToHistory(table);
        } else {
          props.addToHistory(
            <>
              <p>{`Command: ${commandString}`}</p>
              <p>{`Output:`}</p>
              {table}
            </>
          );
        }
      } else {
        props.addToHistory(<p>No CSV loaded to view</p>);
      }
    }
    // If the user wants to search for specific data.
    else if (commandString.startsWith("search")) {
      const [, col, ...valueParts] = commandString.split(" ");
      const value = valueParts.join(" ");

      // Output error if search command is incomplete.
      if (!col) {
        props.addToHistory(<p>Invalid search command</p>);
        return;
      }

      const searchResult = searchTable(col, value);
      if (brief) {
        props.addToHistory(searchResult);
      } else {
        props.addToHistory(
          <>
            <p>{`Command: ${commandString}`}</p>
            <p>
              {`Output:`} {searchResult}
            </p>
          </>
        );
      }
    }
    // For any other commands, retrieve result from the mock command list.
    else {
      const result = getResult(commandString);
      if (brief) {
        props.addToHistory(<p>{result}</p>);
      } else {
        props.addToHistory(
          <>
            <p>{`Command: ${commandString}`}</p>
            <p>{`Output: ${result}`}</p>
          </>
        );
      }
    }
  }

  /**
   * Retrieves the result associated with a given command string from the 'cmds' map.
   * If the command does not exist in the map, a default error message is returned.
   *
   * @param c - The command string to look up.
   * @returns {string} - The result associated with the command or an error message if not found.
   */
  function getResult(c: string): string {
    const result = cmds.get(c);
    return result !== undefined ? result : "Command not found.";
  }

  /**
   * Generates a JSX table element from a 2D string array (CSV data).
   *
   * The first sub-array (data[0]) is treated as the table header,
   * while the subsequent sub-arrays are treated as rows in the table.
   *
   * @param data - A 2D array where the first sub-array is the header and the rest are rows.
   * @returns {JSX.Element} - A table element representing the given data.
   */
  function createTable(data: string[][]): JSX.Element {
    return (
      // Creating the table with a centered style.
      <table border={1} className="centered-table">
        <thead>
          <tr>
            {/* Mapping over the first sub-array to generate table headers */}
            {data[0].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Mapping over the rest of the sub-arrays to generate table rows */}
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* For each row, map over its items to generate individual cells */}
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  /**
   * Searches the currently loaded CSV data based on a column identifier (either name or index)
   * and a value to match. If results are found, it generates and returns a JSX table element using the createTable function.
   *
   * @param col - The column identifier. Can be a column name or an index.
   * @param value - The value to search for in the specified column.
   * @returns {JSX.Element} - A table element displaying the search results or a relevant message if no results found.
   */
  function searchTable(col: string, value: string): JSX.Element {
    // Check if any CSV data is loaded
    if (!currentData) return <p>No CSV loaded</p>;

    // Construct the key used to look up results in the results map.
    const key = col + " " + value;
    const results = currentResultsMap.get(key);

    // If there are no results or they're invalid, notify the user.
    if (!results || results.length === 0 || results[0].length === 0) {
      return <p>No matching rows found</p>;
    }

    // Special case: a result of "0" is used to indicate an invalid column identifier.
    if (results[0][0] === "0") {
      return <p>Invalid column specified</p>;
    }

    // Prepare the data with headers from currentData for the createTable function.
    const tableData = [currentData[0], ...results];

    // Use the createTable function to generate the table.
    return createTable(tableData);
  }
  // Render the REPL input section.
  return (
    // Main container for the REPL input section.
    <div className="repl-input">
      {/* A fieldset is used to group related elements in a form. 
           Here, it groups the ControlledInput component for better visual structure and accessibility. */}
      <fieldset>
        {/* The legend provides a description for the fieldset. */}
        <legend>Enter a command:</legend>

        {/* The ControlledInput component is rendered here.
             It's a reusable input component that receives its current value, a setter function, and an aria label for accessibility. */}
        <ControlledInput
          value={commandString} // Current value of the input.
          setValue={setCommandString} // Function to update the value.
          ariaLabel={"Command input"} // Accessibility label.
        />
      </fieldset>

      {/* Button that triggers the command execution when clicked. 
           The handleClick function is called upon button click. */}
      <button test-id="button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}
