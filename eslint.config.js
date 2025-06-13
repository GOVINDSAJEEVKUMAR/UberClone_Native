// https://docs.expo.dev/guides/using-eslint/
// const { defineConfig } = require('eslint/config');
// const expoConfig = require('eslint-config-expo/flat');

// module.exports = defineConfig([
//   expoConfig,
//   {
//     ignores: ['dist/*'],
//   },
// ]);
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = [
  ...expoConfig,
  ...eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
];
