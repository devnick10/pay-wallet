"use client";
import { signOut, useSession } from "next-auth/react";
import { CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export function AppbarClient() {
  const session = useSession();

  return (
    <div>
      <div className="w-full px-2 sm:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">PayWallet</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-primary"
          >
            Testimonials
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {session.data?.user ? (
            <Button variant="destructive" onClick={() => signOut()}>
              Signout
            </Button>
          ) : (
            <Link href="/signin">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
          )}
          <Link href="/signin" className="hidden md:block">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
