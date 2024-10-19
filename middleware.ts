// Import the Clerk middleware for Next.js server-side authentication
import { clerkMiddleware } from "@clerk/nextjs/server";

// Apply Clerk middleware to handle authentication for protected routes
export default clerkMiddleware();

// Configuration object for the middleware
export const config = {
  matcher: [
    // Protect all routes under /dashboard
    '/dashboard/:path*',
    // Add additional protected routes here if needed
  ],
};
