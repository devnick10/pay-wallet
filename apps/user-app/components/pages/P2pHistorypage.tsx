
import { TransactionsTable } from "@/components/TransactionsTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function P2PHistoryPage() {

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">P2P Transaction History</h1>
        <p className="text-muted-foreground">View and manage your peer-to-peer transaction history.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A record of all your sent and received payments.</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionsTable  />
        </CardContent>
      </Card>
    </div>
  )
}