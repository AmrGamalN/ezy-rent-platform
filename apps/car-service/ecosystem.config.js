module.exports = {
  apps: [
    {
      name: 'car-service',
      script: 'src/server.ts',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'car-service',
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
