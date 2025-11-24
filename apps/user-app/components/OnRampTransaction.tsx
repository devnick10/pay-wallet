"use client";
import { getOnRampTransactions } from "@/actions/getOnRampTransactions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { setOnRampTxns } from "@repo/store/userReducers";
import { useOnRampTxns, useAppDispatch } from "@repo/store/userHooks";
import { useEffect } from "react";

export const OnRampTransactions = () => {
  const dispatch = useAppDispatch();
  const { onRampTxns } = useOnRampTxns();

  useEffect(() => {
    getOnRampTransactions()
      .then((data) => {
        dispatch(setOnRampTxns(data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!onRampTxns.length) {
    return (
      <Card>
        <CardTitle>Recent Transactions</CardTitle>
        <div className="text-center font-bold pb-8 pt-8">
          No Recent transactions
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          Detailed breakdown of recent transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="pt-2">
          {onRampTxns.map((t, i) => (
            <div key={i} className="flex mb-1 justify-between">
              <div>
                <div className="text-md text-muted-foreground">
                  Received INR
                </div>
                <div className="text-slate-600 text-xs">
                  {t.time.toDateString()}
                </div>
              </div>
              <div className="font-medium">+ Rs {t.amount / 100}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
