"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { CreditCard, LogOut, Menu, User, } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { sidebarNavItems } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ThemeToggle } from './toggle-theme'

function DashboardNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const session = useSession()
    return (
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
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
                            <Button
                                className='w-full'
                                variant={"destructive"}
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Button>
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
                <div className='flex items-center justify-center'>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                </Button>
                 <h3 className='hover:border-b uppercase border-neutral-600 '>{session?.data?.user.name}</h3>
                </div>
                <ThemeToggle />
            </div>
        </header>
    )
}

export default DashboardNav