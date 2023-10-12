/**
 * Predefined results for the "simple.csv" file.
 * @type {Map<string, string[][]>}
 */
const simpleCSVResults: Map<string, string[][]> = new Map([
  ["Name Tim", [["Tim Nelson", "CSCI 0320", "instructor"]]],
  ["Name Tim Nelson", [["Tim Nelson", "CSCI 0320", "instructor"]]],
  ["0 Vicky", [["Vicky Chen", "CSCI 0200", "student"]]],
  ["9 Vicky", [["0"]]], // use 0 to indicate invalid column identifier
  ["Nonexistent", [[""]]],
  ["1 Nonexistent", [[""]]],
  [
    "1 CSCI 0320",
    [
      ["Tim Nelson", "CSCI 0320", "instructor"],
      ["Nim Telson", "CSCI 0320", "student"],
    ],
  ],
]);

/**
 * Predefined results for the "ri_state_county.csv" file.
 * @type {Map<string, string[][]>}
 */
const riStateCountyCSVResults: Map<string, string[][]> = new Map([
  ["NAME Kings County, California", [["Kings County California", "06", "031"]]],
  [
    "0 Los Angeles County, California",
    [["Los Angeles County California", "06", "037"]],
  ],
  ["6 Los Angeles County, California", [["0"]]], // use 0 to indicate invalid column identifier
  ["Nonexistent", [[""]]],
  ["1 Nonexistent", [[""]]],
]);

/**
 * Predefined results for the "one_column.csv" file.
 * @type {Map<string, string[][]>}
 */
const oneColumnCSVResults: Map<string, string[][]> = new Map([
  ["Vicky", [["Vicky"]]],
  ["Name Nicole", [["Nicole"]]],
  ["0 Nicole", [["Nicole"]]],
]);

export { oneColumnCSVResults, riStateCountyCSVResults, simpleCSVResults };
