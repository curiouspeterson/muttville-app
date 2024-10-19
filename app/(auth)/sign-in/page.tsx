// Import the SignIn component from Clerk's Next.js package
import { SignIn } from '@clerk/nextjs'

// Define and export the default SignInPage component
export default function SignInPage() {
  // Render the Clerk SignIn component with hash-based routing
  return <SignIn routing="hash" />
}
