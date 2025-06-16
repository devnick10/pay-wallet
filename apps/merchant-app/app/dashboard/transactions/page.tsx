import TransactionsPage from '@/components/pages/TransactionsPage'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense>
      <TransactionsPage/>
    </Suspense>
  )
}

export default page