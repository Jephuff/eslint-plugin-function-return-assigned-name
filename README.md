# `eslint-plugin-returned-react-hooks`

This ESLint plugin enforces rules for functions that return [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install eslint-plugin-returned-react-hooks --save-dev

# yarn
yarn add eslint-plugin-returned-react-hooks --dev
```

Then add it to your ESLint configuration:

```js
{
  "plugins": [
    // ...
    "returned-react-hooks"
  ],
  "rules": {
    // ...
    "returned-react-hooks/create-hook-function-name": "error"
  }
}
```

Or use the recommended config:

```js
{
  "extends": [
    // ...
    "returned-react-hooks/recommended"
  ]
}
```

## Valid and Invalid Examples


## License

MIT
