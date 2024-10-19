"use client" // Added to enable client-side hooks

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-2xl font-bold">
        <Link href="/dashboard">Muttville Schedules</Link>
      </div>
      {/* Navigation Links */}
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard/dogs">Dogs</Link>
        <Link href="/dashboard/activities">Activities</Link>
        {/* Conditional Rendering for Auth Links */}
        {!isSignedIn ? (
          <>
            <Link href="/sign-in">Sign In</Link>
            <Link href="/sign-up">Sign Up</Link>
          </>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </nav>
    </header>
  );
}
