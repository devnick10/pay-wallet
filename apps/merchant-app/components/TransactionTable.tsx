"use client"

import { useState } from "react";
import { ArrowDownLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SearchBar } from "./SearchBar";
import { P2PTransfer } from "@/lib/types";

interface TransactionsTableProps {
    transfers: P2PTransfer[];
    dateNone?: boolean;
}

export function TransactionsTable({ transfers, dateNone }: TransactionsTableProps) {
    const [searchTerm, setSearchTerm] = useState("");

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

    return (
        <div className="space-y-4">
            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <div className="rounded-md border">
                <Table>
                    <TableHeader className="">
                        <TableRow>
                            <TableHead>Transaction ID</TableHead>
                            {!dateNone && <TableHead>Date & Time</TableHead>}
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Amount (₹)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transfers.length > 0 ? (
                            transfers.map((transfer) => {
                                return (
                                    <TableRow key={transfer.id}>
                                        <TableCell className="font-medium">TX{transfer.id}</TableCell>
                                        {
                                            !dateNone && <TableCell>{formatDate(transfer.timestamp)}</TableCell>
                                        }
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                                                    <ArrowDownLeft className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                </div>
                                                <span>Received</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <span className={"text-green-600 dark:text-green-400"}>
                                                {"+"}{(transfer.amount / 100).toLocaleString("en-IN")}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex w-fit items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                                                Completed
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
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