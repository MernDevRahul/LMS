"use client"
import React, { Suspense, useContext, useEffect } from 'react'
import { UserContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/common/Loader';
import dynamic from 'next/dynamic';

const WorkReport = dynamic(() => import('@/app/components/common/workReport'), {
  loading: () => <Loader />,  // This is the fallback loading component
  ssr: false,                 // Disable server-side rendering (optional)
});

export default function WorkReportPage() {
  const {state} = useContext(UserContext)
  const router = useRouter()

    useEffect(() => {
      if (typeof window !== "undefined") {
        if (!state.token) {
          router.push("/"); // Redirect to dashboard if logged in        
        }
      }
    }, [state?.token,router]);

  return (
        <Suspense fallback={<Loader/>}>
          <WorkReport/>
        </Suspense>
  )
}
