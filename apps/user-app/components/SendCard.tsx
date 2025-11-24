"use client";
import { p2pTransfer } from "@/actions/p2pTransfer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addP2pTransaction } from "@repo/store/userReducers";
import { useAppDispatch } from "@repo/store/userHooks";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSendMoney = async () => {
    if (!number || !amount) return;

    setIsLoading(true);
    try {
      const { success, p2p, message } = await p2pTransfer(number, amount * 100);
      if (success && p2p) {
        dispatch(addP2pTransaction(p2p));
        setNumber("");
        setAmount(0);
        toast.success(message);
        return;
      }
      toast.success(message || "Internal server error");
    } catch (error) {
      toast.success("Transfer failed!");
      console.error("Transfer failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
        <CardDescription>Transfer funds to another user</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="number">Recipient Phone Number</Label>
          <Input
            id="number"
            type="tel"
            placeholder="Enter phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
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
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSendMoney}
          disabled={!number || !amount || isLoading}
          className="w-full"
        >
          {isLoading ? "Processing..." : `Send ₹${amount || "0"}`}
        </Button>
      </CardFooter>
    </Card>
  );
}
