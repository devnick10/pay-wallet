import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export const BalanceCard = ({ amount, locked }: {
    amount: number;
    locked: number;
}) => {
    const unlockedBalance = amount / 100;
    const totalLocked = locked / 100;
    const totalBalance = (locked + amount) / 100;

return (
    <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <Wallet className="h-8 w-8 text-primary" />
            <div>
                <CardTitle>Wallet Balance</CardTitle>
                <CardDescription>Detailed breakdown of your funds</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="space-y-4 h-82">
            <div className="flex justify-between">
                <div className="text-muted-foreground">Unlocked Balance</div>
                <div className="font-medium">₹{unlockedBalance.toFixed(2)}</div>
            </div>
            <div className="flex justify-between">
                <div className="text-muted-foreground">Locked Balance</div>
                <div className="font-medium">₹{totalLocked.toFixed(2)}</div>
            </div>
            <div className="border-t pt-4 flex justify-between">
                <div className="font-semibold">Total Balance</div>
                <div className="font-bold text-lg">₹{totalBalance.toFixed(2)}</div>
            </div>
        </CardContent>
    </Card>
)}