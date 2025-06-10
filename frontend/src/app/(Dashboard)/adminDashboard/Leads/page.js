"use client"
import React, { Suspense, useContext, useEffect } from 'react'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'

import { MainAdminContext } from '@/app/context/AdminContext'
import Loader from '@/app/components/common/Loader';

const LeadsPage = dynamic(() => import('./LeadsPage'), {
  loading: () => <Loader/>, // Optionally, show a loading state
  ssr: false, // Optional: Disable SSR if the component only works on the client side
});

export default function page() {
    const {adminState} = useContext(MainAdminContext)
    const router = useRouter();
  
    useEffect(()=>{
      if(!adminState?.token){
        router.push("/administratorLogin")
      }
    },[adminState?.token])

  return (
    <Suspense fallback={<Loader/>}>
      <LeadsPage/>
    </Suspense>
  )
}
