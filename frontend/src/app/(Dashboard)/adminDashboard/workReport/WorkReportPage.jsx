"use client"
import React, { Suspense, useContext, useEffect } from 'react'
import { MainAdminContext } from '@/app/context/AdminContext'
import { useRouter } from 'next/navigation'
import Loader from '@/app/components/common/Loader'
import dynamic from 'next/dynamic'

const WorkReport = dynamic(() => import('@/app/components/common/workReport'), {
  loading: () => <Loader />,  // This is the fallback loading component
  ssr: false,                 // Disable server-side rendering (optional)
});

export default function WorkReportPage() {
  const { adminState } = useContext(MainAdminContext)

  const router = useRouter()
  useEffect(() => {
    if (!adminState?.token) {
      router.push('/')
    }
  }, [adminState?.token, router])
  return (
    <Suspense fallback={<Loader />}>
      <WorkReport />
    </Suspense>
  )
}
