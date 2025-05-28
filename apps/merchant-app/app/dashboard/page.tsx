import { getTotalTransactions } from "@/actions/getTotalTransactions"
import { TransactionsTable } from "@/components/TransactionTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Download, History, QrCode } from "lucide-react"
import Link from "next/link"

export default async function MerchantDashboardPage() {

  const transactions = await getTotalTransactions()

  return (<>
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Merchant Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Cafe Sunshine! Here&apos;s an overview of your business.</p>
      </div>
      <div className="grid ">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="pl-6 text-2xl font-bold">{transactions.length}</div>
            {/* <p className="text-xs text-muted-foreground">+8 from yesterday</p> */}
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
            <TransactionsTable transfers={transactions} />
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/transactions">
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
              <Link href="/dashboard/generate-qr">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <QrCode className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Generate QR</span>
                </div>
              </Link>
              <Link href="/dashboard/transactions">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <History className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Transactions</span>
                </div>
              </Link>
              <Link href="/dashboard/analytics">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <BarChart3 className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Analytics</span>
                </div>
              </Link>
              <Link href="/dashboard/transactions">
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
