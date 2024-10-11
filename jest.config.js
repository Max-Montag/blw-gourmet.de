module.exports = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/context/(.*)$": "<rootDir>/src/context/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel-jest.config.js' }],
  },
};
