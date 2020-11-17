module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-new-wrappers': 1,
    'no-array-constructor': 1,
    'no-new-object': 1
  }
}
