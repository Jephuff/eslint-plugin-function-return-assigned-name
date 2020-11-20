"use strict";

const FunctionReturnAssignedName = require("./FunctionReturnAssignedName");

module.exports.configs = {
  recommended: {
    plugins: ["function-return-assigned-name"],
    rules: {
      "function-return-assigned-name/function-return-assigned-name": "error",
    },
  },
};

module.exports.rules = {
  "function-return-assigned-name": FunctionReturnAssignedName,
};
