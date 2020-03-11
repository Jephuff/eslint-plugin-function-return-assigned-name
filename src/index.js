"use strict";

const FunctionReturnAssignedName = require("./FunctionReturnAssignedName");

module.exports.configs = {
  recommended: {
    plugins: ["returned-react-hooks"],
    rules: {
      "function-return-assigned-name/function-return-assigned-name": "error",
    },
  },
};

module.exports.rules = {
  "function-return-assigned-name": FunctionReturnAssignedName,
};
