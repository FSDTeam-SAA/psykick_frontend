import type React from "react";
// import Link from "next/link";
// import { Bell } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#3a1c6e] flex flex-col">
      {/* Header */}
      {/* <header className="w-full py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-[#7cfc00] to-[#ffff00] text-transparent bg-clip-text">
            Psykick.club
          </span>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-gray-300">
            About Us
          </Link>
          <Link href="/challenges" className="text-white hover:text-gray-300 underline">
            Challenges
          </Link>
          <Link href="/faq" className="text-white hover:text-gray-300">
            FAQ
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="text-white p-2 rounded-full bg-[#4a2c7e]">
            <Bell size={20} />
          </button>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              R
            </div>
            <div className="ml-2 text-white hidden md:block">
              <div className="text-sm">Hello, Robertson</div>
              <div className="text-xs">NOVICE SEEKER</div>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      {/* <footer className="w-full bg-[url('/images/space-bg.jpg')] bg-cover py-8 px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-6">
            <span className="bg-gradient-to-r from-[#7cfc00] to-[#ffff00] text-transparent bg-clip-text text-2xl font-bold mb-4">
              Psykick.club
            </span>

            <div className="flex space-x-4 text-sm">
              <Link href="/" className="text-white hover:text-gray-300">
                Home
              </Link>
              <span>•</span>
              <Link href="/about" className="text-white hover:text-gray-300">
                About Us
              </Link>
              <span>•</span>
              <Link href="/faq" className="text-white hover:text-gray-300">
                FAQ
              </Link>
              <span>•</span>
              <Link href="/challenges" className="text-white hover:text-gray-300">
                Challenges
              </Link>
              <span>•</span>
              <Link href="/contact" className="text-white hover:text-gray-300">
                Contact
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">© 2025 Psykick.club, All rights reserved.</div>

            <div className="flex space-x-4">
              <Link href="#" className="w-8 h-8 rounded-full bg-[#4a2c7e] flex items-center justify-center">
                <span className="text-[#7cfc00]">f</span>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-[#4a2c7e] flex items-center justify-center">
                <span className="text-[#7cfc00]">in</span>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-[#4a2c7e] flex items-center justify-center">
                <span className="text-[#7cfc00]">in</span>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-[#4a2c7e] flex items-center justify-center">
                <span className="text-[#7cfc00]">tw</span>
              </Link>
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
