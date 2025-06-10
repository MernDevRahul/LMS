"use client"
import React, { Suspense, useContext, useEffect } from 'react'
import { UserContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/common/Loader';
import dynamic from 'next/dynamic';

const CourseProgress = dynamic(() => import('@/app/components/Graph/CourseProgress'), {
  loading: () => <Loader />,  // This is the fallback loading component
  ssr: false,                 // Disable server-side rendering (optional)
});

export default function CourseProgressPage() {
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
          <CourseProgress/>
        </Suspense>
  )
}
