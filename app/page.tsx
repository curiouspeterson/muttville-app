import Image from "next/image";
import Link from "next/link";

// Main component for the home page
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      {/* Welcome message */}
      <h1 className="text-4xl font-bold mb-8">Welcome to Muttville Schedules</h1>
      
      {/* Main content area */}
      <main className="flex flex-col gap-8 items-center">
        {/* Muttville logo placeholder - replace with actual logo */}
        <Image
          src="/muttville-logo.png" // Replace with actual logo path
          alt="Muttville logo"
          width={180}
          height={180}
          priority
        />
        
        {/* Call-to-action buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* Dog Status button */}
          <Link href="/dashboard/dogs" className="rounded-full bg-blue-500 text-white px-6 py-3 text-lg font-semibold hover:bg-blue-600 transition-colors">
            See Dog Status
          </Link>
          
          {/* Add a new mutt button */}
          <Link href="/add-dog" className="rounded-full bg-green-500 text-white px-6 py-3 text-lg font-semibold hover:bg-green-600 transition-colors">
            Add a New Mutt
          </Link>
        </div>
      </main>
      
      {/* Footer with additional information */}
      <footer className="mt-16 text-center text-gray-600">
        <p>Muttville Senior Dog Rescue</p>
        <p>Helping senior dogs find loving homes</p>
      </footer>
    </div>
  );
}
