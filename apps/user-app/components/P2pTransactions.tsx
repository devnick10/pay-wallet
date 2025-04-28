import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"
interface P2PTransfer {
    id: number;
    amount: number;
    timestamp: Date;
    fromUser: {
        id: number;
        number?: string;
        name: string | null;
    };
    toUser: {
        id: number;
        number?: string;
        name: string | null;
    };
}
export const P2pTransactions = ({transactions}: {transactions:P2PTransfer[]}) => {
  if (!transactions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-muted-foreground">
          No recent transactions
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.map((t, i) => {
          return (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  t.toUser.number === 'received' 
                    ? 'bg-green-100 dark:bg-green-900/50' 
                    : 'bg-red-100 dark:bg-red-900/50'
                }`}>
                  {t.fromUser.number === 'received' ? (
                    <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium">
                    {t.fromUser.number === 'received' 
                      ? `Received from ${t.fromUser.number}` 
                      : `Sent to ${t.toUser.number}`}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.timestamp.toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })}
                  </div>
                </div>
              </div>
              <div className={`font-semibold ${
                t.fromUser.number === 'received' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {t.fromUser.number === 'received' ? '+' : '-'}₹{Math.abs(t.amount / 100).toFixed(2)}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}