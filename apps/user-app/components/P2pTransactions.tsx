import { authOptions } from "@/app/lib/authOptions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { P2PTransfer } from "@/lib/types";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { getServerSession } from "next-auth";


export const P2pTransactions = async ({ transactions }: { transactions: P2PTransfer[] }) => {
  const session = await getServerSession(authOptions);
  const currentUserNumber = session?.user?.email

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
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.map((t) => {
          const isSent = t.fromUser.number === currentUserNumber;
          const otherParty = isSent ? t.toUser : t.fromUser;
          const amount = (t.amount / 100).toFixed(2);

          return (
            <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isSent ? 'bg-red-100 dark:bg-red-900/50' : 'bg-green-100 dark:bg-green-900/50'
                  }`}>
                  {isSent ? (
                    <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium">
                    {isSent
                      ? `Sent to ${otherParty.name || otherParty.number || 'Unknown'}`
                      : `Received from ${otherParty.name || otherParty.number || 'Unknown'}`}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(t.timestamp).toLocaleDateString('en-IN', {
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
              <div className={`font-semibold ${isSent ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                }`}>
                {isSent ? '-' : '+'}₹{amount}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};