"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bell, CreditCard, LogOut, Menu, User, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { sidebarNavItems } from '@/app/(dashboard)/layout'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

function DashboardNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
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
                            <span className="text-lg font-bold">PayWallet</span>
                            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>
                        <nav className="flex-1 overflow-auto py-2">
                            <div className="grid gap-1 px-2">
                                {sidebarNavItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                            }`}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                        <div className="border-t p-4">
                            <Link
                                href="/"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Link>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2 md:hidden">
                <CreditCard className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">PayWallet</span>
            </div>
            <div className="hidden items-center gap-2 md:flex">
                <CreditCard className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">PayWallet</span>
            </div>
            <div className="ml-auto flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                </Button>
            </div>
        </header>
    )
}

export default DashboardNav