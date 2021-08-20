module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@babel/eslint-parser'
  },
  rules: {
    indent: [2, 4],
    'vue/html-indent': ['error', 4, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: []
    }]
  }
};
