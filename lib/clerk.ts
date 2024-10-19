// Import necessary Clerk configurations
import { ClerkProvider } from '@clerk/nextjs'

// Define the ClerkProviderConfig type
type ClerkProviderConfig = React.ComponentProps<typeof ClerkProvider>
// Create a partial type with the properties we're setting
type PartialClerkConfig = Pick<ClerkProviderConfig, 'publishableKey'>

// Update clerkConfig to use publishableKey
export const clerkConfig: PartialClerkConfig = {
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  // Add other Clerk configuration options here if needed
}
