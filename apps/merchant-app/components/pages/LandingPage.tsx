import LandingHeader from "@/components/LandingHeader"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, CheckCircle2, CreditCard, QrCode, Shield, Smartphone } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <LandingHeader/>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className=" px-4 md:px-6">
            <div className="flex sm:flex-row items-center justify-center flex-col gap-4 md:gap-8 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Accept Payments Anywhere, Anytime
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Grow your business with PayWallet&apos;s seamless payment solutions. No hardware needed, just your
                    smartphone.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signin">
                    <Button size="lg" className="gap-1">
                      Start Accepting Payments <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
                  <div className="overflow-hidden rounded-xl border bg-background shadow-xl">
                    <div className="p-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">Merchant Dashboard</h3>
                        <div className="text-3xl font-bold">₹45,780.00</div>
                        <p className="text-xs text-muted-foreground">Today&apos;s Earnings</p>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-primary/10 p-4 text-center">
                          <QrCode className="mx-auto h-6 w-6 text-primary" />
                          <div className="mt-2 text-sm font-medium">Generate QR</div>
                        </div>
                        <div className="rounded-lg bg-primary/10 p-4 text-center">
                          <BarChart3 className="mx-auto h-6 w-6 text-primary" />
                          <div className="mt-2 text-sm font-medium">View Analytics</div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="text-sm font-medium">Recent Transactions</div>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center justify-between rounded-lg border p-2">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                                <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Payment from Customer #1234</div>
                                <div className="text-xs text-muted-foreground">Today, 2:34 PM</div>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-green-600 dark:text-green-400">+₹500</div>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-2">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                                <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Payment from Customer #5678</div>
                                <div className="text-xs text-muted-foreground">Today, 1:15 PM</div>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-green-600 dark:text-green-400">+₹1,200</div>
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
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Tools for Your Business</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to accept payments and grow your business.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">QR Code Payments</h3>
                  <p className="text-muted-foreground">
                    Generate dynamic QR codes for instant payments from customers.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Real-time Analytics</h3>
                  <p className="text-muted-foreground">
                    Track sales, customer behavior, and business performance in real-time.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Secure Transactions</h3>
                  <p className="text-muted-foreground">
                    Industry-leading security protocols to protect your business and customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that works best for your business.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              {/* Starter Plan */}
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-muted-foreground">For small businesses just getting started</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">₹499</span>
                  <span className="ml-1 text-sm text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Accept up to ₹50,000/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>1.5% transaction fee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Email support</span>
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
              {/* Business Plan */}
              <div className="flex flex-col rounded-lg border bg-primary p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary-foreground">Business</h3>
                  <p className="text-primary-foreground/80">For growing businesses with steady sales</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-primary-foreground">₹999</span>
                  <span className="ml-1 text-sm text-primary-foreground/80">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    <span className="text-primary-foreground">Accept up to ₹2,00,000/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    <span className="text-primary-foreground">1.2% transaction fee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    <span className="text-primary-foreground">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    <span className="text-primary-foreground">Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    <span className="text-primary-foreground">Custom QR branding</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/signin">
                    <Button className="w-full bg-background text-primary hover:bg-background/90">Get Started</Button>
                  </Link>
                </div>
              </div>
              {/* Enterprise Plan */}
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">For large businesses with high volume</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">₹2,999</span>
                  <span className="ml-1 text-sm text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Unlimited transaction volume</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>0.9% transaction fee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Enterprise-grade analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Custom integration</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/signin">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Merchants Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from businesses that have transformed with PayWallet Business.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    &quot;PayWallet Business has revolutionized how we accept payments. Our customers love the quick and easy
                    process, and we&apos;ve seen a 30% increase in sales.&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ananya Desai</p>
                    <p className="text-xs text-muted-foreground">Cafe Owner</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    &quot;The analytics dashboard gives me insights I never had before. I can now make data-driven decisions
                    that have improved my business operations significantly.&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Vikram Singh</p>
                    <p className="text-xs text-muted-foreground">Retail Store Owner</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    &quot;Setting up was incredibly easy. The QR code system is brilliant - no hardware costs, no
                    maintenance, just scan and pay. Perfect for my small business.&quot;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Rahul Patel</p>
                    <p className="text-xs text-muted-foreground">Service Provider</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Grow Your Business?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of businesses that trust PayWallet for their payment needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signin">
                  <Button size="lg" className="gap-1">
                    Sign Up Now <ArrowRight className="h-4 w-4" />
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
        <div className="w-full flex justify-center items-center flex-col px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 ">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">PayWallet Business</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The simplest way to accept payments for your business. Fast, secure, and convenient.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Developer API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Partner Program
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PayWallet Business. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
