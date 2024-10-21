"use client" // Enable client-side hooks and interactivity

// Import necessary components and hooks
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

/**
 * Header component for the application
 * Displays the main navigation and user authentication status
 */
export default function Header() {
  // Get the user's sign-in status from Clerk
  const { isSignedIn } = useUser();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo and main title */}
      <div className="text-2xl font-bold">
        <Link href="/dashboard">Muttville Schedules</Link>
      </div>
      {/* Navigation menu */}
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard/dogs">Dogs</Link>
        <Link href="/dashboard/activities">Activities</Link>
        {/* Conditional rendering based on user's authentication status */}
        {!isSignedIn ? (
          // Display Sign In and Sign Up links for unauthenticated users
          <>
            <Link href="/sign-in">Sign In</Link>
            <Link href="/sign-up">Sign Up</Link>
          </>
        ) : (
          // Display UserButton for authenticated users
          // afterSignOutUrl prop sets the redirect URL after signing out
          <UserButton afterSignOutUrl="/" />
        )}
      </nav>
    </header>
  );
}
