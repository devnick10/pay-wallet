import Link from "next/link"
import { ArrowRight, CreditCard, History, Send, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex w-full flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Rahul! Here's an overview of your wallet.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹24,500.00</div>
            <p className="text-xs text-muted-foreground">+₹2,500 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,234.00</div>
            <p className="text-xs text-muted-foreground">+₹1,234 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Received</CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18,400.00</div>
            <p className="text-xs text-muted-foreground">+₹3,400 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cashback Earned</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹345.00</div>
            <p className="text-xs text-muted-foreground">+₹45 from last month</p>
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
                  <ArrowRight className="h-5 w-5 rotate-180 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sent to Priya Sharma</p>
                  <p className="text-xs text-muted-foreground">Today, 2:34 PM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-500">-₹1,200.00</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Received from Rahul Patel</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 7:15 PM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-500">+₹500.00</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Added money to wallet</p>
                  <p className="text-xs text-muted-foreground">Jan 15, 10:30 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-500">+₹5,000.00</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRight className="h-5 w-5 rotate-180 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sent to Ananya Desai</p>
                  <p className="text-xs text-muted-foreground">Jan 12, 4:45 PM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-500">-₹2,500.00</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/p2p-history">
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
              <Link href="/dashboard/add-money">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <Wallet className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Add Money</span>
                </div>
              </Link>
              <Link href="/dashboard/send-money">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <Send className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Send Money</span>
                </div>
              </Link>
              <Link href="/dashboard/p2p-history">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <History className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">P2P History</span>
                </div>
              </Link>
              <Link href="/dashboard/wallet-history">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <CreditCard className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Wallet History</span>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
