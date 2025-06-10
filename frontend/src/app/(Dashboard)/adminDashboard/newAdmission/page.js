"use client"
import React, { Suspense, useContext, useEffect } from 'react'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'

import { MainAdminContext } from '@/app/context/AdminContext'
import Loader from '@/app/components/common/Loader';

const NewAdmission = dynamic(() => import("./NewAdmission"), {
  ssr: false,
});

export default function Page(){
  const {adminState} = useContext(MainAdminContext)
  const router = useRouter();

  useEffect(()=>{
    if(!adminState?.token){
      router.push("/administratorLogin")
    }
  },[adminState?.token])

  return (
        <Suspense fallback={<Loader/>}>
          <NewAdmission/>
        </Suspense>
  )
}

