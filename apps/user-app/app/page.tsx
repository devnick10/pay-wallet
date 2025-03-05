"use client"
import { useBalance } from '@repo/store/baclance'
import { Appbar } from '@repo/ui/Appbar'
import { useSession ,signIn,signOut} from 'next-auth/react'
import React, { JSX } from 'react'
export default  function page():JSX.Element{
  const session = useSession()
       const balance = useBalance()
  return (
    <div className='text-4xl'>
         {balance}
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}/>
    </div>
  )
}

