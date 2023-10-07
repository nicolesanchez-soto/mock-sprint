var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles/App.css";
import REPL from "./REPL";
/**
 * This is the highest level component!
 */
function App() {
    console.log("hello");
    return (_jsxs("div", __assign({ className: "App" }, { children: [_jsx("p", __assign({ className: "App-header" }, { children: _jsx("h1", { children: "Mock" }) })), _jsx(REPL, {})] })));
}
export default App;
