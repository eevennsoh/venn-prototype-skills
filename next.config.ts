import type { NextConfig } from "next";

/**
 * Next.js Configuration
 * 
 * This config supports two modes:
 * 
 * 1. LOCAL DEVELOPMENT (npm run dev):
 *    - No export, runs Next.js dev server on port 3000
 *    - API routes in app/api/* are active and proxy to backend on port 8080
 *    - Hot reload, fast refresh, all dev features enabled
 * 
 * 2. PRODUCTION BUILD (BUILD_MODE=export npm run build):
 *    - Exports static HTML/CSS/JS to 'out' directory
 *    - API routes are NOT included in the export (they don't work in static mode)
 *    - Files are served by Express backend on port 8080
 *    - Frontend calls backend directly via relative paths (same domain)
 * 
 * The BUILD_MODE environment variable controls the behavior:
 * - Unset or 'development': Normal Next.js build with server-side features
 * - 'export': Static export for production deployment
 */

const isStaticExport = process.env.BUILD_MODE === 'export';

const nextConfig: NextConfig = {
  // Only export static files when BUILD_MODE=export is set (production builds)
  // In development, this is undefined, so Next.js runs normally with API routes
  output: isStaticExport ? 'export' : undefined,
  
  // When exporting, specify the output directory
  ...(isStaticExport && {
    distDir: 'out',
  }),
  
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
