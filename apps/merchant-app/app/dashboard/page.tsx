import Link from "next/link"
import { ArrowRight, BarChart3, CreditCard, DollarSign, Download, History, QrCode, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardToastWrapper } from "@/components/DashboardToastWrapper"
import { Suspense } from "react"

export default async function MerchantDashboardPage() {

  return (<>
    <Suspense fallback={null}>
      <DashboardToastWrapper />
    </Suspense>
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Merchant Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Cafe Sunshine! Here&apos;s an overview of your business.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,450.00</div>
            <p className="text-xs text-muted-foreground">+₹2,100 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+8 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹276.67</div>
            <p className="text-xs text-muted-foreground">+₹12.50 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your recent payment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment from Customer #1234</p>
                  <p className="text-xs text-muted-foreground">Today, 2:34 PM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-500">+₹500.00</p>
                  <p className="text-xs text-muted-foreground">QR Code Payment</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment from Customer #5678</p>
                  <p className="text-xs text-muted-foreground">Today, 1:15 PM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-500">+₹1,200.00</p>
                  <p className="text-xs text-muted-foreground">QR Code Payment</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment from Customer #9012</p>
                  <p className="text-xs text-muted-foreground">Today, 11:30 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-500">+₹350.00</p>
                  <p className="text-xs text-muted-foreground">QR Code Payment</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment from Customer #3456</p>
                  <p className="text-xs text-muted-foreground">Today, 10:15 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-500">+₹780.00</p>
                  <p className="text-xs text-muted-foreground">QR Code Payment</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/merchant/dashboard/transactions">
              <Button variant="outline" size="sm">
                View All Transactions
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/merchant/dashboard/generate-qr">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <QrCode className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Generate QR</span>
                </div>
              </Link>
              <Link href="/merchant/dashboard/transactions">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <History className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Transactions</span>
                </div>
              </Link>
              <Link href="/merchant/dashboard/analytics">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <BarChart3 className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Analytics</span>
                </div>
              </Link>
              <Link href="/merchant/dashboard/transactions">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <Download className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Download Report</span>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </>
  )
}
