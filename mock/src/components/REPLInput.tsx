import "../styles/main.css";
import { useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { cmds } from "./mockedJson";
import { parsedCSV } from "./mockedData";

interface REPLInputProps {
  addToHistory: (command: JSX.Element) => void;
}

let brief: boolean = true;
const dataMap = new Map([["simple.csv", parsedCSV]]);
let currentData: string[][] | null = null;

const resultsMap: Map<string, string[][]> = new Map([
  ["Name Tim", [["Tim Nelson", "CSCI 0320", "instructor"]]],
  ["0 Vicky", [["Vicky Chen", "CSCI 0200", "student"]]],
  ["9 Vicky", [["0"]]], // use 0 to indicate invalid column identifier
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
      const [, col, value] = commandString.split(" ");
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

    const key = `${col} ${value}`;
    const results = resultsMap.get(key);

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
      <table border={1} className="centered-table">
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

      <button onClick={handleClick}>Submit</button>
    </div>
  );
}
