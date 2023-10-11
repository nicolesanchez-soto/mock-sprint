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

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
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

test("on page load, i see a button", async ({ page }) => {
  // TODO WITH TA: Fill this in!
  await page.goto("http://localhost:8000/");
  await expect(page.getByRole("button")).toBeVisible();
});

// This shouldn't pass because we got rid of incrementing
test("after I click the button, its label increments", async ({ page }) => {
  // TODO WITH TA: Fill this in to test your button counter functionality!
  await page.goto("http://localhost:8000/");
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(
    page.getByRole("button", { name: "Submitted 4 times" })
  ).toBeVisible();
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
