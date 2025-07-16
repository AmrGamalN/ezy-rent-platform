import type { Config } from 'jest';

const config: Config = {
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,js}',
    '!<rootDir>/src/**/*.d.ts',
  ],
  testTimeout: 10000,
  // 👇 مهم جدًا عشان يتم إعادة تحميل كل module fresh
  resetModules: true,
};

export default config;
