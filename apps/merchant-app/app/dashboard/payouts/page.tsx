import { Calendar, Download, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PayoutsPage() {
  // Mock data for payouts
  const payouts = [
    {
      id: "PO123456",
      date: "2023-04-15",
      amount: 12450,
      status: "completed",
      account: "HDFC Bank ****4321",
    },
    {
      id: "PO123457",
      date: "2023-04-08",
      amount: 9870,
      status: "completed",
      account: "HDFC Bank ****4321",
    },
    {
      id: "PO123458",
      date: "2023-04-01",
      amount: 11250,
      status: "completed",
      account: "HDFC Bank ****4321",
    },
    {
      id: "PO123459",
      date: "2023-03-25",
      amount: 8750,
      status: "completed",
      account: "HDFC Bank ****4321",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payouts</h1>
        <p className="text-muted-foreground">Manage and track your settlement payouts.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Available Balance</CardTitle>
              <CardDescription>Ready for payout</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹15,780.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Next Payout</CardTitle>
              <CardDescription>Scheduled</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹15,780.00</p>
            <p className="text-sm text-muted-foreground">On April 22, 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Total Payouts</CardTitle>
              <CardDescription>All time</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹42,320.00</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Payout History</CardTitle>
            <CardDescription>A record of all your settlement payouts.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payout ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell className="font-medium">{payout.id}</TableCell>
                  <TableCell>{payout.date}</TableCell>
                  <TableCell>₹{payout.amount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{payout.account}</TableCell>
                  <TableCell>
                    <div className="flex w-fit items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                      Completed
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
