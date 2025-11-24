/**
 * Environment Variables Validation
 * بررسی و اعتبارسنجی متغیرهای محیطی هنگام شروع برنامه
 */

const requiredEnvVars = {
  // Optional but recommended for email
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,

  // Authentication
  JWT_SECRET: process.env.JWT_SECRET,
  API_KEY: process.env.API_KEY,
} as const;

const optionalEnvVars = {
  NODE_ENV: process.env.NODE_ENV || "development",
  API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3000",
  UPLOAD_MAX_SIZE: process.env.UPLOAD_MAX_SIZE || "5242880", // 5MB in bytes
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
} as const;

export interface EnvConfig {
  // Email (optional)
  email: {
    enabled: boolean;
    host?: string;
    port?: number;
    secure?: boolean;
    user?: string;
    pass?: string;
    adminEmail?: string;
  };

  // Auth
  auth: {
    jwtSecret?: string;
    apiKey?: string;
    enabled: boolean;
  };

  // App
  app: {
    nodeEnv: string;
    apiBaseUrl: string;
    uploadMaxSize: number;
    corsOrigin: string;
    logLevel: string;
  };
}

let validatedConfig: EnvConfig | null = null;

export function validateEnv(): EnvConfig {
  if (validatedConfig) {
    return validatedConfig;
  }

  const config: EnvConfig = {
    email: {
      enabled: false,
    },
    auth: {
      enabled: false,
    },
    app: {
      nodeEnv: optionalEnvVars.NODE_ENV,
      apiBaseUrl: optionalEnvVars.API_BASE_URL,
      uploadMaxSize: parseInt(optionalEnvVars.UPLOAD_MAX_SIZE, 10),
      corsOrigin: optionalEnvVars.CORS_ORIGIN,
      logLevel: optionalEnvVars.LOG_LEVEL,
    },
  };

  // Check Email configuration
  const emailVars = [
    requiredEnvVars.SMTP_HOST,
    requiredEnvVars.SMTP_PORT,
    requiredEnvVars.SMTP_USER,
    requiredEnvVars.SMTP_PASS,
  ];

  if (emailVars.every((v) => v)) {
    config.email = {
      enabled: true,
      host: requiredEnvVars.SMTP_HOST,
      port: parseInt(requiredEnvVars.SMTP_PORT!, 10),
      secure: process.env.SMTP_SECURE === "true",
      user: requiredEnvVars.SMTP_USER,
      pass: requiredEnvVars.SMTP_PASS,
      adminEmail: requiredEnvVars.ADMIN_EMAIL || requiredEnvVars.SMTP_USER,
    };
  } else if (optionalEnvVars.NODE_ENV === "production") {
    console.warn(
      "⚠️ Warning: Email configuration is incomplete. Email features will be disabled."
    );
  }

  // Check Authentication configuration
  if (requiredEnvVars.JWT_SECRET || requiredEnvVars.API_KEY) {
    config.auth = {
      enabled: true,
      jwtSecret: requiredEnvVars.JWT_SECRET,
      apiKey: requiredEnvVars.API_KEY,
    };
  } else if (optionalEnvVars.NODE_ENV === "production") {
    console.warn(
      "⚠️ Warning: Authentication is not configured. API endpoints are not protected!"
    );
  }

  validatedConfig = config;
  return config;
}

export function getEnvConfig(): EnvConfig {
  return validateEnv();
}

// Validate on module load
validateEnv();
