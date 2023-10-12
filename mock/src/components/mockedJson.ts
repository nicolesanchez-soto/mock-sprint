/**
 * Mocked command responses.
 * This map contains commands as keys and their respective mock responses as values.
 * For example:
 * - The "search" command returns a string detailing a student's information.
 * - The "load_file" command indicates which file is being loaded.
 * - The "view" command has a placeholder response indicating viewing action.
 * - The "update" command returns updated student information.
 */
let cmds = new Map([
  ["search", "Nim, Telson, CSCI 0320, student"],
  ["load_file", "simple.csv"],
  ["view", "view"],
  ["update", "Nim, Telson, CSCI 0320, instructor"],
]);

// Exporting the command-response map for external usage.
export { cmds };
