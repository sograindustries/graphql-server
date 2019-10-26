module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: ["**/__integrations__/**/*.test.ts"],
  preset: "@shelf/jest-dynamodb"
};
