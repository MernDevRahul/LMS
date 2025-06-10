"use client"
import React, { Suspense, useContext, useEffect } from 'react'
import { MainAdminContext } from '@/app/context/AdminContext';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Loader from '@/app/components/common/Loader';

const RecordedVideo = dynamic(() => import('@/app/components/common/RecordedVideo'), {
  loading: () => <Loader />,  // This is the fallback loading component
  ssr: false,                 // Disable server-side rendering (optional)
});

export default function RecordedVideosPage() {
  const { adminState } = useContext(MainAdminContext)
  const router = useRouter()
  useEffect(() => {
    if (!adminState?.token) {
      router.push('/administratorLogin')
      // toast.success("You are logged in!")
    }
  }, [adminState?.token])
  return (
    <Suspense fallback={<Loader />}>
      <RecordedVideo />
    </Suspense>
  )
}

