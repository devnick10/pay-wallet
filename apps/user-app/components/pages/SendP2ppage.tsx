import React from 'react'
import SendMoney from '@/components/SendCard'
import { P2pTransactions } from '@/components/P2pTransactions';
import { getP2pTransactions } from '@/actions/getP2pTransactions';

export default async function SendP2ppage() {
  const transactions = await getP2pTransactions()

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Send Money</h1>
        <p className="text-muted-foreground">Transfer money to friends and family instantly.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* send money card */}
        <SendMoney />
        {/* recent transaction card */}
        <P2pTransactions transactions={transactions.slice(0,10)}/>
      </div>
    </div>
  )
}
