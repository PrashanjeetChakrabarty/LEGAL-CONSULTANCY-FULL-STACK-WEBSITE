module.exports = {
  apps: [
    {
      name: "fv-frontend",
      script: "npm",
      args: "run start --workspace=frontend",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "fv-admin",
      script: "npm",
      args: "run start --workspace=admin",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
    },
    {
      name: "fv-server",
      script: "npm",
      args: "run start --workspace=server",
      env: {
        NODE_ENV: "production",
        PORT: 5001,
      },
    },
  ],
};
