import { jsx as _jsx } from "react/jsx-runtime";
import "mock/src/styles/main.css";
// Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
export function ControlledInput(_a) {
    var value = _a.value, setValue = _a.setValue, ariaLabel = _a.ariaLabel;
    return (_jsx("input", { type: "text", className: "repl-command-box", value: value, placeholder: "Enter command here!", onChange: function (ev) { return setValue(ev.target.value); }, "aria-label": ariaLabel }));
}
