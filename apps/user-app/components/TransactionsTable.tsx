"use client"

import { getP2pTransactions } from "@/actions/getP2pTransactions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { setP2pTransactions, useP2pTransactions } from "@repo/store/user";
import { useDispatch } from "@repo/store/utils";
import { ArrowDownLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";


export function TransactionsTable({dateNone,recentp2p}:{dateNone?:boolean,recentp2p?:boolean}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "sent" | "received">("all");
  const currentUserNumber = useSession().data?.user.email
  const dispatch = useDispatch();
  const txns = useP2pTransactions();
  let transfers;
  if(recentp2p){
    transfers = txns.slice(0,10)
  }else{
    transfers = txns;
  }


  useEffect(() => {
    getP2pTransactions()
      .then((data) => {
        dispatch(setP2pTransactions(data))
      })
      .catch((err) => {
        console.error(err)
      })
  }, [dispatch])

  const filteredTransfers = transfers.filter((transfer) => {
    const isSent = transfer.fromUser.number === currentUserNumber;
    const counterparty = isSent ? transfer.toUser : transfer.fromUser;

    // Search matches counterparty name, phone number, or transaction ID
    const matchesSearch =
      (counterparty.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        counterparty.number?.includes(searchTerm) ||
        transfer.id.toString().includes(searchTerm));

    // Filter matches
    const matchesFilter =
      filterType === "all" ||
      (filterType === "sent" && isSent) ||
      (filterType === "received" && !isSent);

    return matchesSearch && matchesFilter;
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

  return (
    <div className="space-y-4">
      <SearchBar
        searchTerm={searchTerm}
        filterType={filterType}
        onSearchChange={setSearchTerm}
        onFilterChange={(value) => setFilterType(value as "all" | "sent" | "received")}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              {!dateNone && <TableHead>Date & Time</TableHead>}
              <TableHead>Counterparty</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransfers.length > 0 ? (
              filteredTransfers.map((transfer) => {
                const isSent = transfer.fromUser.number === currentUserNumber;
                const counterparty = isSent ? transfer.toUser : transfer.fromUser;
                const amountInRupees = transfer.amount / 100;

                return (
                  <TableRow key={transfer.id}>
                    <TableCell className="font-medium">TX{transfer.id}</TableCell>
                    {
                      !dateNone && <TableCell>{formatDate(transfer.timestamp)}</TableCell>
                    }
                    <TableCell>{counterparty.name || 'Unknown'}</TableCell>
                    <TableCell>{counterparty.number || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {isSent ? (
                          <>
                            <div className="rounded-full bg-red-100 p-1 dark:bg-red-900">
                              <ArrowDownLeft className="h-3 w-3 rotate-180 text-red-600 dark:text-red-400" />
                            </div>
                            <span>Sent</span>
                          </>
                        ) : (
                          <>
                            <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                              <ArrowDownLeft className="h-3 w-3 text-green-600 dark:text-green-400" />
                            </div>
                            <span>Received</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={isSent ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}>
                        {isSent ? "-" : "+"}{amountInRupees.toLocaleString("en-IN")}
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