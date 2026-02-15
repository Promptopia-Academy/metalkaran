module.exports = {
  apps: [
    {
      name: "metalkaran-frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/var/www/metalkaran-frontend",
      env: { PORT: 3001 },
    },
  ],
};
