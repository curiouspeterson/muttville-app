// Import the SignUp component from Clerk's Next.js package
import { SignUp } from '@clerk/nextjs'

// Define and export the default SignUpPage component
export default function SignUpPage() {
  // Render the Clerk SignUp component with hash-based routing
  return <SignUp routing="hash" />
}
