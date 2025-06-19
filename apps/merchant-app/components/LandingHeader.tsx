import { CreditCard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from './toggle-theme'
import { Button } from './ui/button'

function LandingHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="w-full px-4 md:px-8 flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <span className="sm:text-xl font-bold">PayWallet Business</span>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="#features" className="text-sm font-medium hover:text-primary">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium hover:text-primary">
                        Pricing
                    </Link>
                    <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
                        Testimonials
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link href="/signin">
                        <Button variant="outline" size="sm">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/signin" className="hidden md:block">
                        <Button size="sm">Get Started</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default LandingHeader