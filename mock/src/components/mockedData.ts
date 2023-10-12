/**
 * Mocked data representing a CSV about students and their courses.
 * This dataset contains information about a person's name, the course they're associated with,
 * and their role (either a student or an instructor).
 */
let parsedCSV: string[][] = [
  ["Name", "Course", "Role"],
  ["Nim Telson", "CSCI 0320", "student"],
  ["Tim Nelson", "CSCI 0320", "instructor"],
  ["Vicky Chen", "CSCI 0200", "student"],
];

/**
 * Mocked data representing a CSV about counties in the state of California.
 * This dataset contains the name of the county, its associated state code, and county code.
 */
let parsedCSV2: string[][] = [
  ["NAME", "STATE", "COUNTY"],
  ["Kings County, California", "06", "031"],
  ["Los Angeles County, California", "06", "037"],
  ["Napa County, California", "06", "055"],
  ["Orange County, California", "06", "059"],
  ["Riverside County, California", "06", "065"],
  ["San Bernardino County, California", "06", "071"],
  ["San Joaquin County, California", "06", "077"],
  ["Santa Barbara County, California", "06", "083"],
];

/**
 * Mocked data representing a CSV with one column.
 * This dataset contains names.
 */
let oneColumn: string[][] = [["Name"], ["Vicky"], ["Nicole"]];

// Exporting the datasets for external usage.
export { oneColumn, parsedCSV, parsedCSV2 };
