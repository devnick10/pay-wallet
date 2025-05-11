"use client"

import { useState } from "react"
import { Calendar, Download, Filter, QrCode, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for transactions
const transactions = [
  {
    id: "TX123456",
    date: "2023-04-15T14:30:00",
    customer: "Customer #1234",
    amount: 500,
    status: "completed",
    method: "QR Code",
  },
  {
    id: "TX123457",
    date: "2023-04-15T13:15:00",
    customer: "Customer #5678",
    amount: 1200,
    status: "completed",
    method: "QR Code",
  },
  {
    id: "TX123458",
    date: "2023-04-15T11:45:00",
    customer: "Customer #9012",
    amount: 350,
    status: "completed",
    method: "QR Code",
  },
  {
    id: "TX123459",
    date: "2023-04-15T10:20:00",
    customer: "Customer #3456",
    amount: 780,
    status: "completed",
    method: "QR Code",
  },
  {
    id: "TX123460",
    date: "2023-04-14T16:10:00",
    customer: "Customer #7890",
    amount: 450,
    status: "completed",
    method: "QR Code",
  },
  {
    id: "TX123461",
    date: "2023-04-14T14:30:00",
    customer: "Customer #2345",
    amount: 920,
    status: "completed",
    method: "QR Code",
  },
  {
    id: "TX123462",
    date: "2023-04-14T12:45:00",
    customer: "Customer #6789",
    amount: 300,
    status: "completed",
    method: "QR Code",
  },
  {
    id: "TX123463",
    date: "2023-04-14T10:20:00",
    customer: "Customer #0123",
    amount: 650,
    status: "completed",
    method: "QR Code",
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || filterStatus === transaction.status

    return matchesSearch && matchesFilter
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  // Calculate total amount
  const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

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
            <p className="text-3xl font-bold">₹{(totalAmount / transactions.length).toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A record of all your payment transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by customer or transaction ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all" onValueChange={(value) => setFilterStatus(value)}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Calendar className="h-4 w-4" />
                  <span className="sr-only">Date range</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>{transaction.method}</TableCell>
                        <TableCell className="text-right">
                          <span className="text-green-600 dark:text-green-400">
                            +₹{transaction.amount.toLocaleString("en-IN")}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex w-fit items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                            Completed
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
