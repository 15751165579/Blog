module.exports = {
  extends: 'eslint:recommended',
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    mocha: true
  },
  root: true,
  parser: "babel-eslint",
  rules: {
    'no-console': 'off'
  }
}
