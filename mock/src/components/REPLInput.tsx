import "../styles/main.css";
import { useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { cmds } from "./mockedJson";
import { parsedCSV } from "./mockedData";
import { parsedCSV2 } from "./mockedRIData";

interface REPLInputProps {
  addToHistory: (command: JSX.Element) => void;
}

let brief: boolean = true;
const dataMap = new Map([
  ["simple.csv", parsedCSV],
  ["ri_state_county.csv", parsedCSV2],
]);

let currentData: string[][] | null = null;
let currentResultsMap: Map<string, string[][]> = new Map();

const resultsMap: Map<string, string[][]> = new Map([
  ["Name Tim", [["Tim Nelson", "CSCI 0320", "instructor"]]],
  ["Name Tim Nelson", [["Tim Nelson", "CSCI 0320", "instructor"]]],
  ["0 Vicky", [["Vicky Chen", "CSCI 0200", "student"]]],
  ["9 Vicky", [["0"]]], // use 0 to indicate invalid column identifier
  ["Nonexistent", [[""]]],
  ["1 Nonexistent", [[""]]],
]);

const resultsMap2: Map<string, string[][]> = new Map([
  ["NAME Kings County, California", [["Kings County California", "06", "031"]]],
  [
    "0 Los Angeles County, California",
    [["Los Angeles County California", "06", "037"]],
  ],
  ["6 Los Angeles County, California", [["0"]]], // use 0 to indicate invalid column identifier
  ["Nonexistent", [[""]]],
  ["1 Nonexistent", [[""]]],
]);

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");

  function handleClick() {
    if (commandString === "mode") {
      brief = !brief;
      props.addToHistory(
        <p>{brief ? "Switched to brief mode" : "Switched to verbose mode"}</p>
      );
    } else if (commandString.startsWith("load_file")) {
      const path = commandString.split(" ")[1];
      currentData = dataMap.get(path) || null;
      if (currentData) {
        if (path === "simple.csv") {
          currentResultsMap = resultsMap;
        } else if (path === "ri_state_county.csv") {
          currentResultsMap = resultsMap2;
        }
      }
      console.log(currentResultsMap);
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
    } else if (commandString === "view") {
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
    } else if (commandString.startsWith("search")) {
      const [, col, ...valueParts] = commandString.split(" ");
      const value = valueParts.join(" ");

      // Check for empty search command
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
    } else {
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

  function getResult(c: string) {
    const result = cmds.get(c);
    return result !== undefined ? result : "Command not found.";
  }

  function createTable(data: string[][]): JSX.Element {
    return (
      <table border={1} className="centered-table">
        <thead>
          <tr>
            {data[0].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function searchTable(col: string, value: string): JSX.Element {
    if (!currentData) return <p>No CSV loaded</p>;

    const key = col + " " + value;
    console.log(key);
    const results = currentResultsMap.get(key);
    console.log(results);

    // Handle invalid or no results
    if (!results || results.length === 0 || results[0].length === 0) {
      return <p>No matching rows found</p>;
    }

    // Check if the result indicates an invalid column identifier
    if (results[0][0] === "0") {
      return <p>Invalid column specified</p>;
    }

    // Convert the results to a table
    return (
      <table data-test-id="output-table" border={1} className="centered-table">
        <thead>
          <tr>
            {currentData &&
              currentData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {results.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>

      <button test-id="button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}
