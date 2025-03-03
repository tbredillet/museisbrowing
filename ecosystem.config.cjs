module.exports = {
  apps: [
    {
      name: 'museisbrowing',
      script: './.output/server/index.mjs',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
