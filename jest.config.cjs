// jest.config.cjs
module.exports = {
  preset: "ts-jest",               // handles TS and TSX
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
  "^.+\\.(ts|tsx)$": "ts-jest",
  "^.+\\.(js|jsx)$": "babel-jest"
},

};
