module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 9,
    parser: "babel-eslint"
  },
  extends: ["@nuxtjs"],
  plugins: ["jest"],
  // add your custom rules here
  rules: {
    semi: ["warn", "always"],
    quotes: ["warn", "double"],
    "arrow-parens": ["warn", "always"],
    indent: ["warn", 2],
    "vue/require-default-prop": ["off"]
  },
  globals: {
    routerPush: "readable",
    shallow: "readable",
    mount: "readable",
    shallowMock: "readable",
    mountMock: "readable"
  }
};
