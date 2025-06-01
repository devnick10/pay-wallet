"use client"

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOnRampTransactions} from "@/actions/getOnRampTransactions";
import { SearchBar } from "@/components/SearchBar"; 
import { OnRampTransaction } from "@/lib/types";

interface OnRampTableProps {
  transactions?: OnRampTransaction[];
}

export function OnRampTable({ 
  transactions: initialTransactions = []
}: OnRampTableProps) {
  const [transactions, setTransactions] = useState<OnRampTransaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(initialTransactions.length === 0);

  useEffect(() => {
    async function loadTransactions() {
      setIsLoading(true);
      try {
        const data = await getOnRampTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (initialTransactions.length === 0) {
      loadTransactions();
    }
  },[initialTransactions]);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.provider.toLowerCase().includes(searchTerm.toLowerCase());

    // Note: Since your schema doesn't have type info, filterType is kept for future use
    return matchesSearch;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const getStatusBadge = (status: "Success" | "Failure" | "Processing") => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "Processing":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "Failure":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading transactions...
                </TableCell>
              </TableRow>
            ) : filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">TX-{transaction.id}</TableCell>
                  <TableCell>{formatDate(transaction.time)}</TableCell>
                  <TableCell className="capitalize">{transaction.provider}</TableCell>
                  <TableCell className="text-right">
                    ₹{(transaction.amount / 100).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <div className={`flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(transaction.status)}`}>
                      {transaction.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}