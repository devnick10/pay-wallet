import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Send,
  Shield,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppbarClient } from "@/components/AppbarClient";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <AppbarClient />
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="max-w-6xl mx-auto flex sm:flex-row items-center justify-between flex-col gap-4 md:gap-8 lg:gap-12 xl:grid-cols-2">
              {/* right section */}
              <div className="flex flex-col justify-center space-y-4 px-4 sm:px-0">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    The Simplest Way to <br/> Send & Receive Money
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Fast, secure, and convenient. PayWallet makes managing your
                    money easier than ever.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signin">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              {/* left section */}
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
                  <div className=" overflow-hidden rounded-xl border bg-background shadow-xl">
                    <div className="p-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">Your Wallet</h3>
                        <div className="text-3xl font-bold">₹24,500.00</div>
                        <p className="text-xs text-muted-foreground">
                          Available Balance
                        </p>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-primary/10 p-4 text-center">
                          <Send className="mx-auto h-6 w-6 text-primary" />
                          <div className="mt-2 text-sm font-medium">
                            Send Money
                          </div>
                        </div>
                        <div className="rounded-lg bg-primary/10 p-4 text-center">
                          <CreditCard className="mx-auto h-6 w-6 text-primary" />
                          <div className="mt-2 text-sm font-medium">
                            Add Money
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="text-sm font-medium">
                          Recent Transactions
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center justify-between rounded-lg border p-2">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                                <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">
                                  Received from Rahul
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Today, 2:34 PM
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-green-600 dark:text-green-400">
                              +₹500
                            </div>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-2">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-red-100 p-1 dark:bg-red-900">
                                <ArrowRight className="h-4 w-4 rotate-180 text-red-600 dark:text-red-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">
                                  Sent to Priya
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Yesterday, 7:15 PM
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-red-600 dark:text-red-400">
                              -₹1,200
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need in One App
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  PayWallet combines all essential financial tools in one
                  seamless experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Send className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">P2P Transfers</h3>
                  <p className="text-muted-foreground">
                    Send money instantly to friends and family using just their
                    phone number.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Easy Wallet Funding</h3>
                  <p className="text-muted-foreground">
                    Add money to your wallet using multiple payment methods with
                    zero fees.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Secure Payments</h3>
                  <p className="text-muted-foreground">
                    Industry-leading security protocols to keep your money and
                    data safe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Choose Your Plan
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple, transparent pricing for everyone. No hidden fees.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              {/* Free Plan */}
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-muted-foreground">
                    Essential features for personal use
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">₹0</span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>P2P transfers up to ₹10,000/day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Basic transaction history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Standard customer support</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/signin">
                    <Button className="w-full" variant="outline">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Standard Plan */}
              <div className="flex flex-col rounded-lg border bg-primary p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary-foreground">
                    Standard
                  </h3>
                  <p className="text-primary-foreground/80">
                    Perfect for regular users
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-primary-foreground">
                    ₹99
                  </span>
                  <span className="ml-1 text-sm text-primary-foreground/80">
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    <span className="text-primary-foreground">
                      P2P transfers up to ₹50,000/day
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    <span className="text-primary-foreground">
                      Detailed transaction analytics
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    <span className="text-primary-foreground">
                      Priority customer support
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    <span className="text-primary-foreground">
                      Cashback on transactions
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/signin">
                    <Button className="w-full bg-background text-primary hover:bg-background/90">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Premium Plan */}
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <p className="text-muted-foreground">
                    For power users and businesses
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">₹299</span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Unlimited P2P transfers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Advanced financial analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Higher cashback rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Business account features</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/singin">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don&apos;t just take our word for it. Here&apos;s what our
                  users have to say about PayWallet.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    &qout;PayWallet has completely changed how I manage my
                    finances. The instant transfers and user-friendly interface
                    make it my go-to payment app.&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Priya Sharma</p>
                    <p className="text-xs text-muted-foreground">
                      Marketing Manager
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    &quot;The security features give me peace of mind, and the
                    cashback rewards are a great bonus. I&apos;ve recommended
                    PayWallet to all my friends.&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Rahul Patel</p>
                    <p className="text-xs text-muted-foreground">
                      Software Engineer
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    &quot;As a small business owner, the Premium plan has been
                    invaluable. The detailed analytics help me track all my
                    transactions efficiently.&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ananya Desai</p>
                    <p className="text-xs text-muted-foreground">
                      Business Owner
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied users who trust PayWallet for
                  their daily transactions.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signin">
                  <Button size="lg" className="gap-1">
                    Create Account <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="w-full px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">PayWallet</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The simplest way to send and receive money. Fast, secure, and
                convenient.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PayWallet. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
