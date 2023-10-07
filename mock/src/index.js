import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
// Tim removed some boilerplate to keep things simple.
// We're using an older version of React here.
var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
