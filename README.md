# `eslint-plugin-function-return-assigned-name`

This ESLint plugin enforces rules for variable names that a functions return value is assigned to.
an example usage is for a function that returns a React Hook and needs to be assigne to a variable starting with `use` [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install eslint-plugin-function-return-assigned-name --save-dev

# yarn
yarn add eslint-plugin-function-return-assigned-name --dev
```

Then add it to your ESLint configuration:

```js
{
  "plugins": [
    // ...
    "function-return-assigned-name"
  ],
  "rules": {
    // ...
    "function-return-assigned-name/function-return-assigned-name": [
      "error",
      {
        allowObjectProperties: false,
        allowReturn: false,
        functionName: /^createUse[A-Z0-9].*$/,
        variableName: /^use[A-Z0-9].*$/,
      },
    ],
  }
}
```


## Valid and Invalid Examples


## License

MIT
