type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: Error;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLogLevel = (
  process.env.LOG_LEVEL || "info"
).toLowerCase() as LogLevel;

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLogLevel];
}

function formatLog(entry: LogEntry): string {
  const timestamp = new Date(entry.timestamp).toISOString();
  const level = entry.level.toUpperCase().padEnd(5);
  const context = entry.context ? ` ${JSON.stringify(entry.context)}` : "";
  const error = entry.error
    ? `\nError: ${entry.error.message}\nStack: ${entry.error.stack}`
    : "";

  return `[${timestamp}] ${level} ${entry.message}${context}${error}`;
}

function writeLog(entry: LogEntry): void {
  if (!shouldLog(entry.level)) {
    return;
  }

  const formatted = formatLog(entry);

  switch (entry.level) {
    case "debug":
    case "info":
      console.log(formatted);
      break;
    case "warn":
      console.warn(formatted);
      break;
    case "error":
      console.error(formatted);
      break;
  }
}

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => {
    writeLog({
      timestamp: new Date().toISOString(),
      level: "debug",
      message,
      context,
    });
  },

  info: (message: string, context?: Record<string, unknown>) => {
    writeLog({
      timestamp: new Date().toISOString(),
      level: "info",
      message,
      context,
    });
  },

  warn: (message: string, context?: Record<string, unknown>) => {
    writeLog({
      timestamp: new Date().toISOString(),
      level: "warn",
      message,
      context,
    });
  },

  error: (
    message: string,
    error?: Error,
    context?: Record<string, unknown>
  ) => {
    writeLog({
      timestamp: new Date().toISOString(),
      level: "error",
      message,
      error,
      context,
    });
  },

  request: (
    method: string,
    path: string,
    statusCode: number,
    duration?: number,
    context?: Record<string, unknown>
  ) => {
    const message = `${method} ${path} - ${statusCode}${
      duration ? ` (${duration}ms)` : ""
    }`;
    const level =
      statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";

    writeLog({
      timestamp: new Date().toISOString(),
      level,
      message,
      context: {
        method,
        path,
        statusCode,
        duration,
        ...context,
      },
    });
  },
};
