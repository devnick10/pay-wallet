"use client"
import { getBalance } from "@/actions/getBalance"
import { getPayout, Payouts } from "@/actions/getPayouts"
import { PayoutCard } from "@/components/PayoutCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Calendar, Download, Wallet } from "lucide-react"
import { useEffect, useState } from "react"
interface Balance {
  amount:number;
  locked:number
}
export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<Payouts[]>([])
  const [balance, setBalance] = useState<Balance>({amount:0,locked:0})
  useEffect(() => {
    Promise.all([
      getPayout(),
      getBalance()
    ]).then((data) => {
      const [payouts, balance] = data;
      setPayouts(payouts)
      setBalance(balance)
    }).catch((err) => {
      console.error(err);
      setBalance({amount:0,locked:0});
      setPayouts([]);
      toast({
        description: "Something went wrong!"
      })
    })
  }, [])

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payouts</h1>
        <p className="text-muted-foreground">Manage and track your settlement payouts.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-full">
          <PayoutCard />
        </div>

        <div className="grid gap-6 h-full">
          <Card >
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
              <p className="text-3xl font-bold">₹{(balance.amount / 100).toLocaleString("en-IN")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Locked Balance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{(balance.locked / 100).toLocaleString("en-IN")}</p>
            </CardContent>
          </Card>
        </div>
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
              {payouts.length > 0 ? payouts.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell className="font-medium">{payout.id}</TableCell>
                  <TableCell>{payout.startTime.toLocaleDateString()}</TableCell>
                  <TableCell>₹{(payout.amount / 100).toLocaleString("en-IN")}</TableCell>
                  <TableCell>{payout.provider}</TableCell>
                  <TableCell>
                    <div className="flex w-fit items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                      {payout.status}
                    </div>
                  </TableCell>
                </TableRow>
              )) : (<TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No payouts found.
                </TableCell>
              </TableRow>)
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
