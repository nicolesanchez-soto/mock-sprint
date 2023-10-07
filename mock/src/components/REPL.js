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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "mock/src/styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
/*
  You'll want to expand this component (and others) for the sprints! Remember
  that you can pass "props" as function arguments. If you need to handle state
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/
export default function REPL() {
    // TODO: Add some kind of shared state that holds all the commands submitted.
    // CHANGED
    var _a = useState([]), history = _a[0], setHistory = _a[1];
    console.log("hello");
    var addToHistory = function (command) {
        setHistory(__spreadArray(__spreadArray([], history, true), [command], false));
    };
    return (_jsxs("div", __assign({ className: "repl" }, { children: [_jsx(REPLHistory, { history: history }), _jsx("hr", {}), _jsx(REPLInput, { addToHistory: addToHistory })] })));
}
