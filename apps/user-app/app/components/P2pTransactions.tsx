import { Card } from "@repo/ui/card"

export const P2pTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        to:string,
        from:string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map((t,i )=> <div key={i} className="flex mb-1 justify-between">
                <div>
                    <div className="text-sm">
                          <h3>From {t.from}</h3>
                          <h3>To {t.to}</h3>
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                     Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}