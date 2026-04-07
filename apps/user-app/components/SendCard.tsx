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
import { p2pTransferSchema } from "@repo/common/common";
import { useAppDispatch } from "@repo/store/userHooks";
import { addP2pTransaction } from "@repo/store/userReducers";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSendMoney = async () => {
    const numericAmount = Number(amount);

    const { data, success, error } = p2pTransferSchema.safeParse({
      amount: numericAmount,
      phone: Number(number),
    });

    if (!success) {
      error.issues
        .reverse()
        .map((m) => toast.error(m.message || "Validation failed"));
      return null;
    }

    setIsLoading(true);
    try {
      const { success, p2p, message } = await p2pTransfer(
        data.phone,
        numericAmount,
      );
      if (success && p2p) {
        dispatch(addP2pTransaction(p2p));
        setNumber("");
        setAmount("");
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
            type="text"
            inputMode="numeric"
            placeholder="Enter phone number"
            minLength={10}
            maxLength={12}
            value={number}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setNumber(val);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <Input
            id="amount"
            type="text"
            inputMode="numeric"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setAmount(val);
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {[100, 500, 1000, 2000, 5000].map((value) => (
            <Button
              key={value}
              variant="outline"
              onClick={() => setAmount(String(value))}
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
