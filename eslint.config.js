export default [
  {
    ignores: ["archive/**", "clean-clone/**", "dist/**", "node_modules/**", "control-center/**", "src/**"]
  },
  {
    files: ["**/*.js", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Browser
        window: "readonly",
        document: "readonly",
        console: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        requestAnimationFrame: "readonly",
        alert: "readonly",
        URL: "readonly",
        location: "readonly",
        history: "readonly",
        // Node.js
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        exports: "readonly",
        require: "readonly",
        global: "readonly",
        Buffer: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];
