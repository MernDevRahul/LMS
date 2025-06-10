"use client"
import React, { Suspense, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Loader from '@/app/components/common/Loader';
import { StudentLoginContext } from '@/app/context/StudentLoginContext';

const FeeStatus = dynamic(() => import('@/app/components/common/FeeStatus'), {
  loading: () => <Loader/>  , // Optionally show a loading spinner or message
  ssr: false, // Optional: Disable SSR if you don't need server-side rendering
});

export default function FeeOverviewPage() {
  const { studentState } = useContext(StudentLoginContext);
  const router = useRouter();
  useEffect(() => {

    if (!studentState?.token) {
      router.push('/studentLogin');
      // toast.success("You are logged in!");
    }
  }, [studentState?.token, router]);
  return (
    <Suspense fallback={<Loader/>}>
      <FeeStatus/>
    </Suspense>
  )
}
