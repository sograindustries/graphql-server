module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  coverageReporters: ["lcov", "html"],
  testMatch: ["**/patch/__integrations__/**/*.test.ts"],
  coverageDirectory: "./coverage/"
  // preset: "@shelf/jest-dynamodb"
};
