import { AddMoney } from "@/components/AddMoneyCard";
import { BalanceCard } from "@/components/BalanceCard";
import { OnRampTransactions } from "@/components/OnRampTransaction";


export default function AddMoneyPage() {

    return (
        <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
                <p className="text-muted-foreground">Manage your wallet balance and transactions</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - Add Money */}
                <div className="lg:col-span-1">
                    <AddMoney />
                </div>

                {/* Right Column - Balance and Transactions */}
                <div className="lg:col-span-2 space-y-6">
                    <BalanceCard />
                    <OnRampTransactions  />
                </div>
            </div>
        </div >
    )
}