"use strict";

// Import the ESLint plugin locally
import eslintPluginExample from "./eslint-plugin-example.js";

export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            ecmaVersion: "latest",
        },
        // Using the eslint-plugin-example plugin defined locally
        plugins: {
            "example-plugin": eslintPluginExample
        },
        rules: {
            "example-plugin/rule-name-in-plugin": "error",
        },
    }
]
