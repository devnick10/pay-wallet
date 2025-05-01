"use client"
import { Button } from '@/components/ui/button'
import ErrorType from 'next/error';
import { useRouter } from 'next/navigation'
import React, { startTransition } from 'react'

export default function ErrorBoundary({ err, reset }: { err: ErrorType, reset: () => void }) {
  const router = useRouter();
  return (
    <div className='flex justify-center items-center w-full h-dvh'>
      <div className='flex flex-col items-center p-4'>
        <h1 className='text-2xl'>Something went wrong</h1>
        <Button onClick={() => {
          startTransition(() => {
            router.refresh()
            reset()
          })
        }}>Try again</Button>
      </div>
    </div>
  )
}
