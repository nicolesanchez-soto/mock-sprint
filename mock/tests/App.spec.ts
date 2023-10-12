import { test, expect } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

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

test("on page load, i see a button", async ({ page }) => {
  // TODO WITH TA: Fill this in!
  await page.goto("http://localhost:8000/");
  await expect(page.getByRole("button")).toBeVisible();
});

test("after I click the button, my command gets pushed, and the output displays in the brief mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  // Fill the command input with an invalid command
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");
  const submitButton = await page.locator('button[test-id="button"]');
  await submitButton.click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command not found."
  );
  // Fill the command input with a valid command
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("update");
  await submitButton.click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command not found.Nim, Telson, CSCI 0320, instructor"
  );
});

test("after I click the button, my command gets pushed, and the output displays in the verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  const submitButton = await page.locator('button[test-id="button"]');
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await submitButton.click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("update");
  await submitButton.click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Switched to verbose modeCommand: updateOutput: Nim, Telson, CSCI 0320, instructor"
  );
});

test("I can load one file and another file after and see the success messages", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  const submitButton = await page.locator('button[test-id="button"]');
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file simple.csv");
  await submitButton.click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Loaded data from simple.csv"
  );
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file ri_state_county.csv");
  await submitButton.click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Loaded data from simple.csvLoaded data from ri_state_county.csv"
  );
});

test("after loading CSV file, I can use the view command to see a table", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  const submitButton = await page.locator('button[test-id="button"]');
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file simple.csv");
  await submitButton.click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await submitButton.click();
  await expect(page.getByTestId("output-table")).toBeVisible;
  // Add tests to check contents of table?
});

test("search without loading a CSV provides appropriate feedback", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Name Tim");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toHaveText("No CSV loaded");
});

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

test("search with column identifier returns correct data", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill("load_file simple.csv");
  await page.locator('button[test-id="button"]').click();
  await page.getByLabel("Command input").fill("search Name Tim");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("output-table")).toBeVisible;
});

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

test("empty search command gives feedback", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill("search");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Invalid search command"
  );
});

test("REPL history is present upon load", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const historyElement = await page.$('[data-testid="repl-history"]');
  expect(historyElement).toBeTruthy();
});

test("unknown command gives feedback", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").fill("unknownCmd");
  await page.locator('button[test-id="button"]').click();
  await expect(page.getByTestId("repl-history")).toHaveText(
    "Command not found."
  );
});

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

test("search with '0 Los Angeles County, California' should provide feedback about an invalid column identifier", async ({
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
