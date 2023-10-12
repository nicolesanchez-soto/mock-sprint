# Mock-nsanch17-vchen27

<!-- ABOUT THE PROJECT -->

## Sprint 2: About Vicky and Nicole's Mock Project

Mock is a web front-end application that uses HTML and CSS to set up a basic
command-promt interface, and TypeScript with React to organize components and process events in that interface.

There are two primary stakeholders for this program:

- Real estate appraisers who want to take advantage of an applicaiton that would allow them to explore data from a CSV file
- Back-end developers who want to incorporate their back-end server application to a web application to make it accessible to other stakeholders.

- **Link to Git repo**:

```sh
  https://github.com/cs0320-f23/mock-nsanch17-vchen27
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Running the Program

This is an example of how to run all the program in the browser:

- **Hosted on**:

```sh
  http://localhost:8000/
```

- **To load file**:

```sh
  Type into command line "load_file simple.csv"
```

- **To view file**:

```sh
  Type into command line "view"
```

- **To search file**:

```sh
  Type into command line "search Name Vicky"
```

### Testing

In this application, we use Playwright tests to cover the functionality of Mock:

There are 25 unit tests, some examples of the functionality we test are:

- Valid and invalid searches
- Correct HTML contents appear on our application
- Setup of web application contains necessary components
- One file can be loaded after another
- Correct output responses for successes and failures
- Mode can be switched between brief and verbose

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Design Choices -->

## Design Choices

Within Mock, we separated the REPL functionality into 3 classes—- `REPL`, `REPLHistory`, and `REPLInput`. This is so we have proper separation of concerns between the top level organization, the history, and the input. The majority of our functionality is contained in the `REPLInput` as our application depends on commands entered into the input box.

Our `REPLInput` depends on our mocked data files, which are `mockedData`, `mockedJson`, and `mockedResults`. `mockedData` and `mockedResults` replicate parsed CSV 2D arrays we use in our `REPLInput` where we handle `load_file`, `view`, and `search` CSV. The `mockedJson` is used to fulfill User Story 1, where we provide simple output strings in the history given an command.

<!-- Bugs -->

## Bugs

One bug we encountered was when viewing the output table after loading a CSV, the table would appear underneath the input box and not the history. We fixed this by having the `REPLInput` function return a `JSX.Element` so we can create a `JSX.Element` with the view or search results and pass it into the parameters of our `addToHistory` function.

Another bug we encountered was an issue with searching the mock file `ri_state_county.csv`. Our search would work with the `simple.csv`, but would only output `No matching rows found` when we tried to search `ri_state_county.csv`. We realized this was because we define the values following the `search` command with a space, so searching county and state names resulted in no matching values. we fixed this by adding the line:

```sh
  const value = valueParts.join(" ");
```

to recombine the value of our search.

## Collaborators and Resources

- **Collab Section Collaborators**:
  Alejandro Jackson - cs login: ajacks41

- **Resources used to inform our code**:

This website gave us information about `JSX.Element` which we used in our code:

```sh
  https://dev.to/elhamnajeebullah/react-typescript-jsxelement-vs-reactelement-and-which-one-to-use-it-with-functional-component-2oa6#:~:text=Element
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
