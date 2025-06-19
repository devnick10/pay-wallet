'use client'
import { getBalance } from "@/actions/getBalance"
import { getP2pTransactions } from "@/actions/getP2pTransactions"
import { TransactionsTable } from "@/components/TransactionsTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CreditCard, History, Send, Wallet } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useMemo } from "react"
import { setamount, setlockedamout, setP2pTransactions, useBalance, useP2pTransactions, } from "@repo/store/user"
import { useDispatch } from "@repo/store/utils"

export default function DashboardPage() {

  const session = useSession()

  const dispatch = useDispatch()
  const balance = useBalance();
  const transactions = useP2pTransactions()

  useEffect(() => {
    Promise.all([
      getBalance(),
      getP2pTransactions()
    ]).then(([balance, p2p]) => {
      dispatch(setP2pTransactions(p2p))
      dispatch(setamount(balance.amount)),
      dispatch(setlockedamout(balance.locked))
    }).catch((err) => {
      console.error(err)
    })
  }, [dispatch])

  const { totalRecvied, totalSent } = useMemo(() => {
    const totalSent = transactions.filter(txn => txn.fromUser.id === Number(session?.data?.user.id))
      .reduce((sum, txn) => sum + txn.amount, 0) / 100
    const totalRecvied = transactions.filter(txn => txn.fromUser.id !== Number(session?.data?.user.id))
      .reduce((sum, txn) => sum + txn.amount, 0) / 100
    return { totalSent, totalRecvied }
  }, [transactions])

  if (!session?.data?.user || !session?.data?.user.email) return
  return (
    <div className="flex w-full flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back,{session.data.user.name}! Here&apos;s an overview of your wallet.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{balance.balance / 100}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Received</CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRecvied}</div>
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
            <TransactionsTable recentp2p={true} dateNone={true} />
          </CardContent>
          <CardFooter>
            <Link href="/p2p-history">
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
              <Link href="/add-money">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <Wallet className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Add Money</span>
                </div>
              </Link>
              <Link href="/send-p2p">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <Send className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Send Money</span>
                </div>
              </Link>
              <Link href="/p2p-history">
                <div className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-muted">
                  <History className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">P2P History</span>
                </div>
              </Link>
              <Link href="/wallet-history">
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
