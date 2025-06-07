"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { createOnRampPayout } from "@/actions/createOnRampPayout";
import { toast } from "@/hooks/use-toast";
import { useDispatch } from "@repo/store/utils";
import { decrementamount, incrementlockedamount } from "@repo/store/merchant";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
}, {
    name: "Axis Bank",
}];

export const PayoutCard = () => {
    const [amount, setAmount] = useState<number>();
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const handlePayout = async () => {
        if (!amount || !provider) return;

        setIsLoading(true);
        try {
            //TODO: Implement payouts state 
            // 1> add payouts to state on create payouts
            // 1> get payoutes data from create payout action and put on state  
            const { success } = await createOnRampPayout(amount, provider);
            dispatch(decrementamount(amount))
            dispatch(incrementlockedamount(amount))
            if (success) {
                toast({
                    description: "Payout add on processing."
                })
            }
        } catch (error) {
            console.error("Error payout money:", error);
            toast({
                description: "Internal server error plz try again later."
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payout Money from Wallet</CardTitle>
                <CardDescription>Choose amount and bank to proceed with the payout</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setAmount(Number(e.target.value))
                        }}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {[100, 500, 1000, 2000, 5000].map((value) => (
                        <Button
                            key={value}
                            variant="outline"
                            onClick={() => setAmount(value)}
                            className="flex-1"
                        >
                            ₹{value}
                        </Button>
                    ))}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bank">Select Bank</Label>
                    <Select
                        onValueChange={(value) => {
                            const bank = SUPPORTED_BANKS.find(x => x.name === value);
                            if (bank) {
                                setProvider(bank.name);
                            }
                        }}
                        value={provider}
                    >
                        <SelectTrigger id="bank">
                            <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                            {SUPPORTED_BANKS.map((bank) => (
                                <SelectItem key={bank.name} value={bank.name}>
                                    {bank.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handlePayout}
                    disabled={!amount || isLoading}
                    className="w-full"
                >
                    {isLoading ? "Processing..." : `Payout ₹${amount || "0"} from Wallet`}
                </Button>
            </CardFooter>
        </Card>
    )
};