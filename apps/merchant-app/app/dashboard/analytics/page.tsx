import Analytics from '@/components/AnalyticsPage'
import { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
      <Analytics />
    </Suspense>
  )
}

export default page