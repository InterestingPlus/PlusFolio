"use client";

import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/Button";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Navbar() {
  const { user, signOut } = useAuth();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            {/* <FileText className="w-4 h-4 text-white" /> */}
            {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"> */}
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <span className="font-bold text-lg" id="black">
              <span id="purple-gradient">Plus</span>
              Folio
            </span>
          </Link>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/features"
                className="hidden sm:block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </Link>
              <Link
                href="/templates"
                className="hidden sm:block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Templates
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  <User className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
