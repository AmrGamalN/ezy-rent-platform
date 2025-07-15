module.exports = {
  apps: [
    {
      name: 'elastic-service',
      script: 'src/server.ts',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'elastic-service',
      script: 'dist/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
