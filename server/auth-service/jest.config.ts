export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  rootDir: './src',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/', '/dist/', '/logs/'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: false }],
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  testTimeout: 15000,
  verbose: true,
};
