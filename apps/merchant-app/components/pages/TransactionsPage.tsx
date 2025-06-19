"use client"

import { getTotalTransactions } from "@/actions/getTotalTransactions"
import { TransactionsTable } from "@/components/TransactionTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { setTransactions, useTransactions } from "@repo/store/merchant"
import { useDispatch } from "@repo/store/utils"
import { QrCode } from "lucide-react"
import { useEffect, useMemo } from "react"

export default function TransactionsPage() {
  const transactions = useTransactions()
  const dispatch = useDispatch()

  useEffect(() => {
    getTotalTransactions().then((data) => {
      dispatch(setTransactions(data))
    }).catch((err) => {
      toast({
        description: "Something went wrong!"
      })
      console.error(err);
      setTransactions([])
    })
  }, [dispatch])

  // Calculate total amount
  const { totalAmount, averageTransactions } = useMemo(() => {
    const totalAmount = (transactions.reduce((sum, transaction) => sum + transaction.amount, 0)) / 100
    const averageTransactions = (totalAmount / transactions.length || 0).toFixed(2)
    return {
      totalAmount,
      averageTransactions
    }
  }, [transactions])

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">View and manage your payment transactions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <QrCode className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Total Transactions</CardTitle>
              <CardDescription>All time</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{transactions.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <QrCode className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>All time</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{totalAmount.toLocaleString("en-IN")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <QrCode className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Average Transaction</CardTitle>
              <CardDescription>All time</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{averageTransactions}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A record of all your payment transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionsTable transfers={transactions} />
        </CardContent>
      </Card>
    </div>
  )
}
