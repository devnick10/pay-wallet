"use client"
import { useBalance } from '@repo/store/baclance'
import React from 'react'

function page() {
  const balance = useBalance()
  return (

    <div>    {balance} hii there</div>
  )
}

export default page