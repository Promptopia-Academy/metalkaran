/**
 * Authentication & Authorization System
 * سیستم احراز هویت و مجوزدهی با JWT و API Key
 */

import { NextRequest } from "next/server";
import { getEnvConfig } from "./env";
import { logger } from "./logger";

const envConfig = getEnvConfig();

export interface AuthResult {
  authorized: boolean;
  message?: string;
  user?: { id: string; type: "api_key" | "jwt" };
}

/**
 * Extract API Key from request headers
 */
function getApiKey(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  
  // Check for Bearer token format
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  
  // Check for API-Key header
  const apiKeyHeader = request.headers.get("api-key");
  if (apiKeyHeader) {
    return apiKeyHeader;
  }
  
  // Check for X-API-Key header
  const xApiKeyHeader = request.headers.get("x-api-key");
  if (xApiKeyHeader) {
    return xApiKeyHeader;
  }
  
  return null;
}

/**
 * Verify API Key
 */
function verifyApiKey(apiKey: string): boolean {
  const configApiKey = envConfig.auth.apiKey;
  
  if (!configApiKey) {
    logger.warn("API Key authentication is not configured");
    return false;
  }
  
  return apiKey === configApiKey;
}

/**
 * Verify JWT Token (simple verification for now)
 * In production, use a proper JWT library like jsonwebtoken
 */
function verifyJWT(token: string): boolean {
  const jwtSecret = envConfig.auth.jwtSecret;
  
  if (!jwtSecret) {
    logger.warn("JWT authentication is not configured");
    return false;
  }
  
  // Simple JWT verification (you can use jsonwebtoken library for production)
  try {
    // Basic validation - in production use proper JWT library
    const parts = token.split(".");
    if (parts.length !== 3) {
      return false;
    }
    
    // For now, just check if token exists and has correct format
    // TODO: Implement proper JWT verification with jsonwebtoken
    return true;
  } catch {
    return false;
  }
}

/**
 * Authenticate request
 */
export async function authenticate(
  request: NextRequest
): Promise<AuthResult> {
  // If auth is disabled, allow all requests
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
  
  // Try API Key first
  if (verifyApiKey(token)) {
    logger.debug("Request authenticated with API Key");
    return {
      authorized: true,
      user: { id: "api_user", type: "api_key" },
    };
  }
  
  // Try JWT
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

/**
 * Middleware for protected routes
 */
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

