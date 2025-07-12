export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: ['<rootDir>/server/auth-service'],
  testTimeout: 15000,
  verbose: true,
};
