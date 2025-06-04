import TransactionsPage from '@/components/TransactionsPage'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense>
      <TransactionsPage/>
    </Suspense>
  )
}

export default page