module.exports = {
  env: { node: true },
  parserOptions: { sourceType: "module" },
  plugins: ["prettier"],
  parser: "babel-eslint",
  rules: {
    "prettier/prettier": [1, { trailingComma: "es5" }],
  },
  extends: ["prettier", "eslint:recommended"],
};
