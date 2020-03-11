/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

const ESLintTester = require("eslint").RuleTester;
const ReactHooksESLintPlugin = require("../");
const errors = require("../src/CreateHookFunctionName").errors;
const ReactHooksESLintRule =
  ReactHooksESLintPlugin.rules["create-hook-function-name"];

ESLintTester.setDefaultConfig({
  parser: require.resolve("babel-eslint"),
  parserOptions: { ecmaVersion: 6, sourceType: "module" },
});

const defaultOptions = {
  allowObjectProperties: false,
  allowReturn: false,
  functionName: /^createUse[A-Z0-9].*$/,
  variableName: /^use[A-Z0-9].*$/,
};

const tests = {
  valid: [
    {
      code: "const useResource = createUseResource()",
      options: [defaultOptions],
    },
    {
      code: "let useResource = createUseResource()",
      options: [defaultOptions],
    },
    {
      code: "var useResource = createUseResource()",
      options: [defaultOptions],
    },
    { code: "useResource = createUseResource()", options: [defaultOptions] },
    {
      code: "function wrapper() { const useResource = createUseResource() }",
      options: [defaultOptions],
    },
    {
      code: "function wrapper() { return createUseResource() }",
      options: [{ ...defaultOptions, allowReturn: true }],
    },
    {
      code: "const data = { useResource: createUseResource() }",
      options: [
        { ...defaultOptions, allowObjectProperties: true, allowReturn: true },
      ],
    },
    {
      code: "data.useResource = createUseResource()",
      options: [
        { ...defaultOptions, allowObjectProperties: true, allowReturn: true },
      ],
    },
  ],
  invalid: [
    {
      code: "const resource = createUseResource()",
      errors: [
        errors.nameIncorrect(/^createUse[A-Z0-9].*$/, /^use[A-Z0-9].*$/),
      ],
      options: [defaultOptions],
    },
    {
      code: "resource = createUseResource()",
      errors: [
        errors.nameIncorrect(/^createUse[A-Z0-9].*$/, /^use[A-Z0-9].*$/),
      ],
      options: [defaultOptions],
    },
    {
      code: "function wrapper() { const resource = createUseResource() }",
      errors: [
        errors.nameIncorrect(/^createUse[A-Z0-9].*$/, /^use[A-Z0-9].*$/),
      ],
      options: [defaultOptions],
    },
    {
      code: "function wrapper() { return createUseResource() }",
      errors: [errors.noReturn(/^createUse[A-Z0-9].*$/, /^use[A-Z0-9].*$/)],
      options: [defaultOptions],
    },
    {
      code: "const data = { useResource: createUseResource() }",
      errors: [errors.noNameSpace(/^createUse[A-Z0-9].*$/, /^use[A-Z0-9].*$/)],
      options: [defaultOptions],
    },
    {
      code: "const data = { resource: createUseResource() }",
      errors: [
        errors.nameIncorrect(/^createUse[A-Z0-9].*$/, /^use[A-Z0-9].*$/),
      ],
      options: [{ ...defaultOptions, allowObjectProperties: true }],
    },
    {
      code: "data.resource = createUseResource()",
      options: [{ ...defaultOptions, allowObjectProperties: true }],
      errors: [
        errors.nameIncorrect(/^createUse[A-Z0-9].*$/, /^use[A-Z0-9].*$/),
      ],
    },
    {
      code: "data.useResource = createUseResource()",
      errors: [errors.noNameSpace(/^createUse[A-Z0-9].*$/, /^use[A-Z0-9].*$/)],
      options: [defaultOptions],
    },
  ],
};

const eslintTester = new ESLintTester();
eslintTester.run("react-hooks", ReactHooksESLintRule, tests);
