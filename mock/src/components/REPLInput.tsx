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

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");

  function handleClick() {
    if (commandString === "mode") {
      brief = !brief;
      props.addToHistory(
        <p>{brief ? "Switched to brief mode." : "Switched to verbose mode."}</p>
      );
    } else if (commandString.startsWith("load_file")) {
      const path = commandString.split(" ")[1];
      const currentData = dataMap.get(path) || null;
      if (currentData) {
        props.addToHistory(<p>{`Loaded data from ${path}.`}</p>);
      } else {
        props.addToHistory(<p>{"Invalid file path provided."}</p>);
      }
    } else if (commandString === "view") {
      const table = createTable(dataMap.get("simple.csv")!);
      if (brief) {
        props.addToHistory(table);
      } else {
        props.addToHistory(
          <>
            <p>{`Command: ${commandString}`}</p>
            {table}
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
