"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createOnRampTransaction } from "@/actions/onRampTransaction";
import toast from "react-hot-toast";
import { useAppDispatch } from "@repo/store/userHooks";
import { addOnRampTxns } from "@repo/store/userReducers";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl,
  );
  const [amount, setAmount] = useState<number>(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const handleAddMoney = async () => {
    if (!amount || !provider) return;

    setIsLoading(true);
    try {
      const { success, onRampTxns, balance } = await createOnRampTransaction(
        amount,
        provider,
      );
      if (success && onRampTxns && balance) {
        dispatch(addOnRampTxns(onRampTxns));
      }
      window.location.href = redirectUrl || "";
      toast.success("Plz wait till trasaction success,it's take few minutes");
    } catch (error) {
      console.error("Error adding money:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Money to Wallet</CardTitle>
        <CardDescription>
          Choose amount and bank to proceed with the transaction
        </CardDescription>
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
              setAmount(Number(e.target.value));
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
              const bank = SUPPORTED_BANKS.find((x) => x.name === value);
              if (bank) {
                setRedirectUrl(bank.redirectUrl);
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
          onClick={handleAddMoney}
          disabled={!amount || isLoading}
          className="w-full"
        >
          {isLoading ? "Processing..." : `Add ₹${amount || "0"} to Wallet`}
        </Button>
      </CardFooter>
    </Card>
  );
};
