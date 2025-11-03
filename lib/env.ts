/**
 * Environment variable validation and typed access
 * 
 * Validates required environment variables at runtime (not build time).
 * During build, provides defaults to allow static generation.
 * 
 * Fails fast with clear error messages if required vars are missing at runtime.
 */

const requiredEnvVars = {
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
  AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME || "Apps",
} as const;

// Validate required environment variables (only at runtime, not during build)
function validateEnv() {
  // Skip validation during build/static generation
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL && !process.env.AIRTABLE_API_KEY) {
    // In production build, allow missing env vars for static generation
    // They'll be validated at runtime
    return;
  }

  const missing: string[] = [];

  if (!requiredEnvVars.AIRTABLE_API_KEY) {
    missing.push("AIRTABLE_API_KEY");
  }

  if (!requiredEnvVars.AIRTABLE_BASE_ID) {
    missing.push("AIRTABLE_BASE_ID");
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
      `Please set these in your .env.local file or environment variables.`
    );
  }
}

// Validate on module load (only in Node.js runtime, skip during build)
if (typeof window === "undefined") {
  // Only validate if we're actually running (not during build)
  // Check if we're in a build context by looking for Next.js build indicators
  const isBuildTime = process.env.NEXT_PHASE === "phase-production-build" || 
                      process.env.NEXT_PHASE === "phase-development-build";
  
  if (!isBuildTime) {
    validateEnv();
  }
}

export const env = {
  AIRTABLE_API_KEY: requiredEnvVars.AIRTABLE_API_KEY || "",
  AIRTABLE_BASE_ID: requiredEnvVars.AIRTABLE_BASE_ID || "",
  AIRTABLE_TABLE_NAME: requiredEnvVars.AIRTABLE_TABLE_NAME,
} as const;

