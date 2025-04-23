import React from 'react'
import SendMoney from '../../../components/SendCard'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/authOptions';
import prisma from '@repo/db/client';
import { P2pTransactions } from '../../../components/P2pTransactions';

async function getP2pTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2PTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id)
    },
    select: {
      amount: true,
      timestamp: true,
      toUser: true,
      fromUser: true
    }
  });
  return txns.map(t => ({
    time: t.timestamp,
    amount: t.amount,
    to: t.toUser.number,
    from: t.fromUser.number
  }))
}
export default async function page() {
  const transactions = await getP2pTransactions()

  return (<div className="w-screen">
    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
      P2p Transfer
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
      <div >
        <SendMoney />
      </div>
      <div >
        <div className="">
          <P2pTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  </div>
  )
}
