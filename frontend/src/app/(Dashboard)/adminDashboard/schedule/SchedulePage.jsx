"use client"
import React, { Suspense, useContext, useEffect } from 'react'
import { MainAdminContext } from '@/app/context/AdminContext'
import { useRouter } from 'next/navigation'
import Loader from '@/app/components/common/Loader';
import dynamic from 'next/dynamic';

const Schedule = dynamic(() => import('@/app/components/common/Schedule'), {
  loading: () => <Loader />,  // This is the fallback loading component
  ssr: false,                 // Disable server-side rendering (optional)
});


export default function SchedulePage() {
  const { adminState } = useContext(MainAdminContext)
  const router = useRouter()
  useEffect(() => {
    if (!adminState?.token) {
      router.push('/administratorLogin')
    }
  }, [adminState?.token])
  return (
    <Suspense fallback={<Loader />}>
      <Schedule />
    </Suspense>
  )
}
