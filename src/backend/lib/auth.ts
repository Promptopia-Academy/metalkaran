import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { getEnvConfig } from "./env";
import { logger } from "./logger";

const envConfig = getEnvConfig();

export interface AuthResult {
  authorized: boolean;
  message?: string;
  user?: { id: string; type: "api_key" | "jwt" };
}

function getApiKey(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  const apiKeyHeader = request.headers.get("api-key");
  if (apiKeyHeader) {
    return apiKeyHeader;
  }

  const xApiKeyHeader = request.headers.get("x-api-key");
  if (xApiKeyHeader) {
    return xApiKeyHeader;
  }

  return null;
}

function verifyApiKey(apiKey: string): boolean {
  const configApiKey = envConfig.auth.apiKey;

  if (!configApiKey) {
    logger.warn("API Key authentication is not configured");
    return false;
  }

  return apiKey === configApiKey;
}

function verifyJWT(token: string): boolean {
  const jwtSecret = envConfig.auth.jwtSecret;

  if (!jwtSecret) {
    logger.warn("JWT authentication is not configured");
    return false;
  }

  try {
    jwt.verify(token, jwtSecret);
    return true;
  } catch (error) {
    logger.warn("JWT verification failed", error as Error);
    return false;
  }
}

export async function authenticate(request: NextRequest): Promise<AuthResult> {
  if (!envConfig.auth.enabled) {
    logger.debug("Authentication is disabled, allowing request");
    return { authorized: true };
  }

  const token = getApiKey(request);

  if (!token) {
    logger.warn("No authentication token provided", {
      path: request.nextUrl.pathname,
      method: request.method,
    });
    return {
      authorized: false,
      message: "Authentication required. Please provide API key or JWT token.",
    };
  }

  if (verifyApiKey(token)) {
    logger.debug("Request authenticated with API Key");
    return {
      authorized: true,
      user: { id: "api_user", type: "api_key" },
    };
  }

  if (verifyJWT(token)) {
    logger.debug("Request authenticated with JWT");
    return {
      authorized: true,
      user: { id: "jwt_user", type: "jwt" },
    };
  }

  logger.warn("Invalid authentication token", {
    path: request.nextUrl.pathname,
    method: request.method,
  });

  return {
    authorized: false,
    message: "Invalid authentication token.",
  };
}

export function requireAuth(
  handler: (request: NextRequest, ...args: any[]) => Promise<Response>
) {
  return async (request: NextRequest, ...args: any[]) => {
    const authResult = await authenticate(request);

    if (!authResult.authorized) {
      return new Response(
        JSON.stringify({
          success: false,
          message: authResult.message || "Unauthorized",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            "WWW-Authenticate": "Bearer",
          },
        }
      );
    }

    return handler(request, ...args);
  };
}
