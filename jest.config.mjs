import path from "path";
import fs from "fs";

const swcrc = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), ".swcrc"), { encoding: "utf-8" }),
);

const sharedConfig = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", { ...swcrc }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};

/** @type {import('jest').Config} */
const config = {
  projects: [
    {
      ...sharedConfig,
      displayName: "app",
      testEnvironment: "jsdom",
      moduleNameMapper: {
        "\\.s?css$": "<rootDir>/.config/tests/fileMock.js",
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
          "<rootDir>/.config/tests/fileMock.js",
      },
      testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{ts,tsx,js,jsx}",
        "<rootDir>/src/**/*.{spec,test}.{ts,tsx,js,jsx}",
      ],
      setupFilesAfterEnv: [
        "<rootDir>/.config/tests/setupTests.js",
        "@testing-library/jest-dom",
      ],
    },
    {
      ...sharedConfig,
      displayName: "scripts",
      testEnvironment: "node",
      testMatch: ["<rootDir>/scripts/**/__tests__/**/*.test.js"],
    },
  ],
};

export default config;
