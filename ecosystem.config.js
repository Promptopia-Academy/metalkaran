/**
 * PM2 Ecosystem Configuration
 * تنظیمات PM2 برای مدیریت Process
 */

module.exports = {
  apps: [
    {
      name: "metalkaran",
      script: "npm",
      args: "start",
      cwd: "/var/www/metalkaran",
      instances: 1, // برای تولید، می‌توانید تعداد instances را افزایش دهید
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      min_uptime: "10s",
      max_restarts: 10,
    },
  ],
};
