export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: ['<rootDir>/apps/auth-service'],
  testTimeout: 15000,
  verbose: true,
};
