module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: ["**/*{vue}", "middleware/**/*{js}", "store/**/*{js}"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "pages",
    "layouts",
    "assets",
    "ui/DownloadButton/",
    "middleware/social.js",
    "components/FBLogin/FBLogin"
  ],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js"
  },
  moduleFileExtensions: ["js", "vue"],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },
  setupFiles: ["jest-localstorage-mock", "<rootDir>/jest.setup.js"],
  setupTestFrameworkScriptFile: "jest-extended",
  snapshotSerializers: ["jest-serializer-vue"]
};
