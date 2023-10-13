# Mock-nsanch17-vchen27

<!-- ABOUT THE PROJECT -->

## Sprint 2: Mock

### Project Overview: Mock

**Mock** stands as an innovative web front-end application, diligently crafted to blend the simplicity of traditional command-prompt interfaces with the dynamic capabilities of modern web technologies.

Utilizing **HTML** and **CSS**, Mock establishes a fundamental command-prompt interface. Concurrently, **TypeScript** and **React** are employed to systematically organize components and efficiently process events within the interface, ensuring a responsive and intuitive user experience.

#### Key Stakeholders:

1. **Real Estate Appraisers**:

   - **Objective**: Leverage an application that facilitates exploratory data analysis directly from CSV files.
   - **Benefits**: Enables them to intuitively explore and analyze property data, ensuring precise and data-driven appraisal decisions.

2. **Back-End Developers**:
   - **Objective**: Integrate their server applications with a web front-end to enhance accessibility and utility.
   - **Benefits**: Extends the functionality of their back-end server application, making it seamlessly accessible to diverse stakeholders through a web platform.

#### Detailed Functionality:

Mock is not just an application; it's a solution designed with precision and user-centric functionality in mind. It seeks to bridge the gap between complex data handling and user-friendly interactions, providing a platform that is both robust in functionality and straightforward in usability.

For real estate appraisers, the application offers a smooth, uncomplicated pathway to explore substantial CSV data, providing a tool that is not just efficient but also cognitively intuitive.

Back-end developers, on the other hand, find a conduit in Mock to expand the reach of their server applications. By integrating with a web front-end, they pave the way for their applications to be accessed and utilized by a wider audience, enhancing both utility and user engagement.

- **Total Estimated Time to Complete Project:** 14 Hours

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

### Running the Tests

This is an example of how to run all the tests using playwright:

- **Command**:

```sh
  npx playwright test
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Design Choices -->

## Design Choices

Within **Mock**, our primary objective was to streamline the interface and functionality of the REPL (Read–Eval–Print Loop). The application architecture is divided into three primary classes—`REPL`, `REPLHistory`, and `REPLInput`, each meticulously crafted to ensure a clean separation of concerns:

### REPL

The `REPL` class serves as the top-level organizational unit, ensuring coordinated interactions between the input functionality and the display history.

### REPLHistory

`REPLHistory` is dedicated to managing the user's command history and outputs, ensuring that the input and output history are stored and displayed in an organized, user-friendly manner.

### REPLInput

The majority of our functionality resides in `REPLInput`. It acts as the nerve center of our application, processing all commands entered into the input box and triggering the corresponding functionalities or outputs. This separation into different classes ensures that each aspect of the REPL - top-level organization, input management, and history management - is modular, maintainable, and independently testable, adhering to best practices in software design.

#### Dependency on Mocked Data

- `REPLInput` heavily relies on three mocked data files—`mockedData`, `mockedJson`, and `mockedResults`—each designed to emulate different data scenarios within the application.

  - **`mockedData`** and **`mockedResults`**: These two files mimic parsed 2D arrays, derived from CSV data. They play a crucial role when handling various commands in `REPLInput`, specifically:
    - `load_file`: for loading and parsing the data.
    - `view`: for visualizing data.
    - `search`: for querying specific data subsets.
  - **`mockedJson`**: This file is essential for fulfilling User Story 1, wherein it facilitates providing simple output strings in the REPL history upon command execution. It ensures that upon receiving a specific command, a coherent and relevant output string is generated and displayed in the REPL history.

This design choice was motivated by our commitment to creating a system where functionalities are not just systematically divided but are also logically grouped. It allows developers and users to navigate and understand the system’s flow, maintaining a balance between functional richness and operational simplicity.

<!-- Bugs -->

## Bugs

One bug we encountered was when viewing the output table after loading a CSV, the table would appear underneath the input box and not the history. We fixed this by having the `REPLInput` function return a `JSX.Element` so we can create a `JSX.Element` with the view or search results and pass it into the parameters of our `addToHistory` function.

Another bug we encountered was an issue with searching the mock file `ri_state_county.csv`. Our search would work with the `simple.csv`, but would only output `No matching rows found` when we tried to search `ri_state_county.csv`. We realized this was because we define the values following the `search` command with a space, so searching county and state names resulted in no matching values. we fixed this by adding the line:

```sh
  const value = valueParts.join(" ");
```

to recombine the value of our search.

Furthermore, Mock currently has no known bugs.

## Collaborators and Resources

- **Collab Section Collaborators**:
  Alejandro Jackson - cs login: ajacks41

- **Resources used to inform our code**:

This website gave us information about `JSX.Element` which we used in our code:

```sh
  https://dev.to/elhamnajeebullah/react-typescript-jsxelement-vs-reactelement-and-which-one-to-use-it-with-functional-component-2oa6#:~:text=Element
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
