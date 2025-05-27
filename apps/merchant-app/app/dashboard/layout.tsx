"use client"
<<<<<<< HEAD
=======
import { ThemeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import {
  BarChart3,
  CreditCard,
  DollarSign,
  History,
  Home,
  LogOut,
  Menu,
  QrCode,
  Settings,
  Store,
  User
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import type React from "react";
>>>>>>> de32c7e474d9b01c7f237ed6b7e4d191aec7d93c

import { sidebarNavItems } from "@/lib/utils"
import DashboardNav from "@/components/DashboardNav"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"
import toast from "react-hot-toast"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
<<<<<<< HEAD
    <div className="flex h-dvh flex-col">
      <DashboardNav />
      <div className="flex flex-1 overflow-hidden">
=======
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-xs">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 border-b p-4">
                <CreditCard className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">PayWallet Business</span>
              </div>
              <nav className="flex-1 overflow-y-auto py-2">
                <div className="grid gap-1 px-2">
                  {sidebarNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="border-t p-4">
                <Button
                  onClick={async () => {
                    try {
                      await signOut();
                      toast({
                        title: "Success",
                        description: "Signed out successfully",
                      });
                    } catch (error) {
                      console.error("Sign out error:", error);
                      toast({
                        title: "Error",
                        description: "Failed to sign out. Please try again.",
                      });
                    }
                  }}
                  variant="destructive"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white transition-colors hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile Logo */}
        <div className="flex items-center gap-2 md:hidden">
          <CreditCard className="h-6 w-6 text-primary" />
          <span className="text-md font-bold md:text-lg">PayWallet Business</span>
        </div>

        {/* Desktop Logo */}
        <div className="hidden items-center gap-2 md:flex">
          <CreditCard className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">PayWallet Business</span>
        </div>

        {/* Right Side Icons */}
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
>>>>>>> de32c7e474d9b01c7f237ed6b7e4d191aec7d93c
        <aside className="hidden w-64 shrink-0 border-r md:block">
          <div className="flex h-full flex-col">
            <nav className="flex-1 overflow-y-auto py-4">
              <div className="grid gap-1 px-2">
                {sidebarNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                      }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="border-t p-4">
<<<<<<< HEAD
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
=======
              <Button
                onClick={async () => {
                    try {
                      await signOut();
                      toast({
                        title: "Success",
                        description: "Signed out successfully",
                      });
                    } catch (error) {
                      console.error("Sign out error:", error);
                      toast({
                        title: "Error",
                        description: "Failed to sign out. Please try again.",
                      });
                    }
                  }}
                variant="destructive"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white transition-colors hover:text-foreground"
              >
>>>>>>> de32c7e474d9b01c7f237ed6b7e4d191aec7d93c
                <LogOut className="h-4 w-4" />
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    signOut({ callbackUrl: "/" })
                    toast.success("Signout successfully")
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="h-full p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}