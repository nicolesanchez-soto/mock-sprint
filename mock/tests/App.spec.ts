import { test, expect } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

test("on page load, i see an input bar", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("Submit button is visible", async ({ page }) => {
  // Navigate to your HTML page
  await page.goto("http://localhost:8000/"); // Replace 'your-website-url' with the actual URL of your HTML page.

  // Check if the submit button is visible
  const submitButton = await page.$('button:has-text("Submit")');
  expect(submitButton).toBeTruthy();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});
// This test ensures that there's a visible button on page load.
test("on page load, i see a button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByRole("button")).toBeVisible();
});

// This test verifies the behavior when different commands are inputted and the button is clicked.
test("after I click the button, my command gets pushed, and the output displays in the brief mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  // Testing with an invalid command.
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");
  const submitButton = await page.locator('button[test-id="button"]');
  await submitButton.click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command not found."
  );

  // Testing with a valid command.
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("update");
  await submitButton.click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command not found.Nim, Telson, CSCI 0320, instructor"
  );
});

// This test checks the output when toggling between the modes and then submitting a command.
test("after I click the button, my command gets pushed, and the output displays in the verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  const submitButton = await page.locator('button[test-id="button"]');
  // Switching to verbose mode.
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await submitButton.click();

  // Testing with a command in verbose mode.
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("update");
  await submitButton.click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Switched to verbose modeCommand: updateOutput: Nim, Telson, CSCI 0320, instructor"
  );
});

// This test checks if the success messages display correctly after loading different CSV files.
test("I can load one file and another file after and see the success messages", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  const submitButton = await page.locator('button[test-id="button"]');
  // Loading the first CSV file.
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file simple.csv");
  await submitButton.click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Loaded data from simple.csv"
  );

  // Loading the second CSV file.
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file ri_state_county.csv");
  await submitButton.click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Loaded data from simple.csvLoaded data from ri_state_county.csv"
  );
});

// This test ensures that after loading a CSV file, the view command displays a table.
test("after loading CSV file, I can use the view command to see a table", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  const submitButton = await page.locator('button[test-id="button"]');
  // Loading the CSV file.
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file simple.csv");
  await submitButton.click();

  // Using the view command.
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await submitButton.click();
  await expect(page.getByTestId("output-table")).toBeVisible;
});

// This test ensures that if a user tries to search without loading any CSV, they get the appropriate feedback.
test("search without loading a CSV provides appropriate feedback", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Name Tim");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toHaveText("No CSV loaded");
});

// This test ensures that if a user tries to load a non-existent CSV file, they get the appropriate feedback.
test("loading a non-existent file provides appropriate feedback", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file nonExistent.csv");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Invalid file path provided"
  );
});

// This test checks the feedback when searching for non-existent data after loading a valid CSV file.
test("search for non-existent data provides appropriate feedback", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file simple.csv");
  await page.locator('button[test-id="button"]').click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Nonexistent");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Loaded data from simple.csvNo matching rows found"
  );
});

// This test verifies that toggling between modes gives the correct feedback in the REPL history.
test("toggling between modes gives correct feedback", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill("mode");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Switched to verbose mode"
  );
  await page.getByLabel("Command input").fill("mode");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Switched to verbose modeSwitched to brief mode"
  );
});

// This test ensures that entering multiple commands in succession adds all of them to the REPL history.
test("entering multiple commands adds to REPL history", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const commands = ["mode", "load_file simple.csv", "view"];
  for (let cmd of commands) {
    await page.getByLabel("Command input").fill(cmd);
    await page.locator('button[test-id="button"]').click();
  }
  for (let cmd of commands) {
    await expect(page.getByTestId("repl-history")).toContainText(cmd);
  }
});

// This test checks that using a column identifier in the search command returns the correct data.
test("search with column identifier returns correct data", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill("load_file simple.csv");
  await page.locator('button[test-id="button"]').click();
  await page.getByLabel("Command input").fill("search Name Tim");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("output-table")).toBeVisible;
});

// This test verifies that column identifiers with spacing also return the correct data.
test("search with column identifier  and spacing returns correct data", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill("load_file simple.csv");
  await page.locator('button[test-id="button"]').click();
  await page.getByLabel("Command input").fill("search Name Tim Nelson");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("output-table")).toBeVisible;
});

// This test ensures that using an invalid column identifier provides the correct feedback.
test("invalid column identifier provides appropriate feedback", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill("load_file simple.csv");
  await page.locator('button[test-id="button"]').click();
  await page.getByLabel("Command input").fill("search 9 Vicky");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Loaded data from simple.csvInvalid column specified"
  );
});

// This test confirms that attempting a search command with no parameters gives appropriate feedback.
test("empty search command gives feedback", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill("search");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Invalid search command"
  );
});

// This test verifies that REPL history is present when the page loads.
test("REPL history is present upon load", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const historyElement = await page.$('[data-testid="repl-history"]');
  expect(historyElement).toBeTruthy();
});

// This test checks that using an unknown command in the REPL provides the appropriate feedback.
test("unknown command gives feedback", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill("unknownCmd");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command not found."
  );
});

// This test confirms that a CSV file with a single column can be loaded and searched correctly.
test("single column CSV can be loaded and searched", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill("load_file one_column.csv");
  await page.locator('button[test-id="button"]').click();
  await page.getByLabel("Command input").fill("search Name Nicole");
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Loaded data from one_column.csv"
  );
  await expect(page.getByTestId("output-table")).toBeVisible;
});

// This test checks that searching for a specific name returns all matching rows.
test("search with 'Name Tim' should return matching rows", async ({ page }) => {
  await page.goto("http://localhost:8000/"); // Load data and switch to verbose mode

  await page.getByLabel("Command input").fill("load_file simple.csv");
  await page.locator('button[test-id="button"]').click();
  await page.getByLabel("Command input").fill("mode");
  await page.locator('button[test-id="button"]').click(); // Search for 'Name Tim' and check for matching rows

  await page.getByLabel("Command input").fill("search Name Tim");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toContainText(
    "Loaded data from simple.csvSwitched to verbose modeCommand: search Name TimOutput: NameCourseRoleTim NelsonCSCI 0320instructor"
  );
});

// This test ensures that a search query returning multiple results shows all of them.
test("a search that returns multiple rows should give a table with multiple rows", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill("load_file simple.csv");
  await page.locator('button[test-id="button"]').click(); // Search for 'Name Tim' and check for matching rows
  await page.getByLabel("Command input").fill("search 1 CSCI 0320");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toContainText(
    "Loaded data from simple.csvNameCourseRoleTim NelsonCSCI 0320instructorNim TelsonCSCI 0320student"
  );
  await expect(page.getByTestId("output-table")).toBeVisible;
});

// This test checks that searching for a specific county name returns the correct row.
test("search with 'NAME Kings County, California' should return matching rows", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/"); // Load data and switch to verbose mode
  await page.getByLabel("Command input").fill("load_file ri_state_county.csv");
  await page.locator('button[test-id="button"]').click();
  await page.getByLabel("Command input").fill("mode");
  await page.locator('button[test-id="button"]').click(); // Search for 'NAME Kings County, California' and check for matching rows
  await page
    .getByLabel("Command input")
    .fill("search NAME Kings County, California");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toContainText(
    "Loaded data from ri_state_county.csvSwitched to verbose modeCommand: search NAME Kings County, CaliforniaOutput: NAMESTATECOUNTYKings County California06031"
  );
});

// This test confirms that searching for a name not present in the CSV in verbose mode gives appropriate feedback.
test("search for a non-existent name in verbose mode should provide appropriate feedback", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/"); // Load data and switch to verbose mode

  await page.getByLabel("Command input").fill("load_file simple.csv");
  await page.locator('button[test-id="button"]').click();
  await page.getByLabel("Command input").fill("mode");
  await page.locator('button[test-id="button"]').click(); // Search for a name that does not exist in the data

  await page.getByLabel("Command input").fill("search Nonexistent Name");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toContainText(
    "Loaded data from simple.csvSwitched to verbose modeCommand: search Nonexistent NameOutput: No matching rows found"
  );
});

// This test checks that searching with a valid column identifier and value returns the correct data.
test("search with '0 Los Angeles County, California' should provide valid data", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/"); // Load data and switch to verbose mode

  await page.getByLabel("Command input").fill("load_file ri_state_county.csv");
  await page.locator('button[test-id="button"]').click();
  await page.getByLabel("Command input").fill("mode");
  await page.locator('button[test-id="button"]').click(); // Search with an invalid column identifier

  await page
    .getByLabel("Command input")
    .fill("search 0 Los Angeles County, California");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toContainText(
    "Loaded data from ri_state_county.csvSwitched to verbose modeCommand: search 0 Los Angeles County, CaliforniaOutput: NAMESTATECOUNTYLos Angeles County California06037"
  );
});
