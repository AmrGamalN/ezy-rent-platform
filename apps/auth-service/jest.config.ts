import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  coverageDirectory: 'coverage',
  // verbose: true,
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  // transform: {
  //   '^.+\\.ts$': [
  //     'ts-jest',
  //     // {
  //     //   isolatedModules: true,
  //     // },
  //   ],
  // },
};

export default config;
