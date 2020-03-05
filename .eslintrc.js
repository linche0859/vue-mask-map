module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // "import/no-relative-parent-imports": "error",
    // "import/order": ["error", {
    //   "groups": ["builtin", "external", "parent", "sibling", "index"],
    //   "newlines-between": "always-and-inside-groups"
    // }],
    "space-before-function-paren": 0,
    // allow async / await
    "generator-star-spacing": ["error", { before: true, after: false }],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    // 括號的顯示，大、中括號分開
    "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
    // 前方空白格顯示
    indent: ["error", 2, { "SwitchCase": 1 }]
  }
}
