"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {  CreditCard, History, Home, LogOut, Send, Settings, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardNav from "@/components/DashboardNav"
import { signOut } from "next-auth/react"
export const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Add Money",
      href: "/transfer",
      icon: Wallet,
    },
    {
      title: "Send Money",
      href: "/p2p",
      icon: Send,
    },
    {
      title: "P2P History",
      href: "/p2p-history",
      icon: History,
    },
    {
      title: "Wallet History",
      href: "/wallet-history",
      icon: CreditCard,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
 
  return (
    <div className="flex min-h-screen flex-col">
       <DashboardNav/>
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r md:block">
          <div className="flex h-full flex-col">
            <nav className="flex-1 overflow-auto py-4">
              <div className="grid gap-1 px-2">
                {sidebarNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="border-t p-4">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                <LogOut className="h-4 w-4" />
                <Button variant="destructive" className="w-full" onClick={()=>
                    signOut({callbackUrl:"/"})
                }>
                    Logout
                </Button>
                </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
