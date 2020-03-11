"use strict";

const CreateHookFunctionName = require("./CreateHookFunctionName");

module.exports.configs = {
  recommended: {
    plugins: ["returned-react-hooks"],
    rules: {
      "returned-react-hooks/create-hook-function-name": "error",
    },
  },
};

module.exports.rules = {
  "create-hook-function-name": CreateHookFunctionName,
};
