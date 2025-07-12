import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OnRampTable } from "@/components/OnRamptable";

export default function WalletHistoryPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Wallet Transaction History
        </h1>
        <p className="text-muted-foreground">
          View and manage your wallet transactions.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Wallet Transactions</CardTitle>
          <CardDescription>
            A record of all your wallet transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnRampTable />
        </CardContent>
      </Card>
    </div>
  );
}
