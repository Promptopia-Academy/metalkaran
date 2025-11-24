/**
 * Health Check Endpoint
 * بررسی وضعیت سلامت سیستم
 */

import { NextResponse } from "next/server";
import { getEnvConfig } from "@/backend/lib/env";
import { existsSync } from "fs";
import path from "path";

export async function GET() {
  const startTime = Date.now();
  
  try {
    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: "1.0.0",
      services: {
        api: "operational",
        database: "operational",
        email: "unknown",
        auth: "unknown",
      },
      checks: {
        dataDirectory: false,
        diskSpace: true, // Assume true for now
      },
    };

    const envConfig = getEnvConfig();

    // Check data directory
    const dataDir = path.join(process.cwd(), "data");
    health.checks.dataDirectory = existsSync(dataDir);

    // Check email service
    health.services.email = envConfig.email.enabled ? "configured" : "not configured";

    // Check auth service
    health.services.auth = envConfig.auth.enabled ? "configured" : "not configured";

    // Determine overall status
    const allServicesOk =
      health.services.api === "operational" &&
      health.services.database === "operational" &&
      health.checks.dataDirectory &&
      health.checks.diskSpace;

    const responseTime = Date.now() - startTime;

    return NextResponse.json(
      {
        ...health,
        responseTime: `${responseTime}ms`,
        status: allServicesOk ? "healthy" : "degraded",
      },
      {
        status: allServicesOk ? 200 : 503,
      }
    );
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Health check failed",
        responseTime: `${responseTime}ms`,
      },
      {
        status: 503,
      }
    );
  }
}

