import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { cmds } from "./mockedJson";
import { parsedCSV } from "./mockedData";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  addToHistory: (command: string) => void;
}
//const commandsMap = new Map(Object.entries(JSON.stringify(mock.cmds)));
let brief: boolean = true;
const dataMap = new Map([["filepath1", parsedCSV]]);
let table: string = "";
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // Manages the current amount of times the button is clicked
  const [count, setCount] = useState<number>(0);
  const [table, setTable] = useState<JSX.Element | null>(null);

  // This function is triggered when the button is clicked.
  function handleClick() {
    if (commandString === "mode") {
      brief = !brief; //flip brief switch
      return;
    } else if (commandString === "load_file") {
      createTable(parsedCSV);
      return;
    }
    if (brief) {
      props.addToHistory(getResult(commandString));
    } else {
      props.addToHistory(
        "Command: " + commandString + "\nOutput: " + getResult(commandString)
      );
    }
    setCount(count + 1);
    console.log("clicked");
  }

  function getResult(c: string) {
    const result = cmds.get(c);
    if (result !== undefined) {
      return result;
    } else {
      console.log("Command not found.");
      return "Command not found.";
    }
  }
  function createTable(data: string[][]) {
    let header: string[] = data[0];
    const tableJSX = (
      <table border={1}>
        <thead>
          <tr>
            {header.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((line, rowIndex) => (
            <tr key={rowIndex}>
              {line.map((elt, colIndex) => (
                <td key={colIndex}>{elt}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );

    setTable(tableJSX);
  }

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {table !== null ? table : null}
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>

      <button onClick={() => handleClick()}>Submitted {count} times</button>
    </div>
  );
}
