/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

const ESLintTester = require("eslint").RuleTester;
const ReactHooksESLintPlugin = require("../");
const ReactHooksESLintRule =
  ReactHooksESLintPlugin.rules["create-hook-function-name"];

ESLintTester.setDefaultConfig({
  parser: require.resolve("babel-eslint"),
  parserOptions: { ecmaVersion: 6, sourceType: "module" },
});

const tests = {
  valid: [
    {
      code: `
        const resource = createUseResource()
      `,
      options: [{ createFunctionNames: ["overrideName"] }],
    },
    `
      useResource = createUseResource()
    `,
    `
      const useResource = createUseResource()
    `,
    `
      function wrapper() {
        const useResource = createUseResource()
      }
    `,
    `
      function wrapper() {
        return createUseResource()
      }
    `,
    {
      code: `
        const data = {
          useResource: createUseResource()
        }
      `,
      options: [{ allowObjectProperties: true }],
    },
    {
      code: `
        data.useResource = createUseResource()
      `,
      options: [{ allowObjectProperties: true }],
    },
  ],
  invalid: [
    {
      code: `
        const resource = overRideName()
      `,
      errors: [
        "variable storing value returned from create hook function must follow hook naming convention",
      ],
      options: [{ createFunctionNames: ["overRideName"] }],
    },
    {
      code: `
        const resource = createUseResource()
      `,
      errors: [
        "variable storing value returned from create hook function must follow hook naming convention",
      ],
    },
    {
      code: `
        resource = createUseResource()
      `,
      errors: [
        "variable storing value returned from create hook function must follow hook naming convention",
      ],
    },
    {
      code: `
        function wrapper() {
          const resource = createUseResource()
        }
      `,
      errors: [
        "variable storing value returned from create hook function must follow hook naming convention",
      ],
    },
    {
      code: `
        function wrapper() {
          return createUseResource()
        }
      `,
      errors: [
        "create hook functions are not allowed to be directly returned from another function, assign it to a variable following hook naming conventions",
      ],
      options: [{ allowReturn: false }],
    },
    {
      code: `
        const data = {
          useResource: createUseResource()
        }
      `,
      errors: ["no assigning to namespace"],
    },
    {
      code: `
        const data = {
          resource: createUseResource()
        }
      `,
      errors: [
        "variable storing value returned from create hook function must follow hook naming convention",
      ],
      options: [{ allowObjectProperties: true }],
    },
    {
      code: `
        data.resource = createUseResource()
      `,
      options: [{ allowObjectProperties: true }],
      errors: [
        "variable storing value returned from create hook function must follow hook naming convention",
      ],
    },
    {
      code: `
        data.useResource = createUseResource()
      `,
      errors: ["no assigning to namespace"],
    },
  ],
};

const eslintTester = new ESLintTester();
eslintTester.run("react-hooks", ReactHooksESLintRule, tests);
