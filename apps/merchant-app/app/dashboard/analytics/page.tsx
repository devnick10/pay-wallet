import Analytics from '@/components/pages/AnalyticsPage'
import { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
      <Analytics />
    </Suspense>
  )
}

export default page