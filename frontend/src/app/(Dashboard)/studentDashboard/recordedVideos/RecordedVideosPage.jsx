"use client"
import React, { Suspense, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Loader from '@/app/components/common/Loader';
import { StudentLoginContext } from '@/app/context/StudentLoginContext';

// Dynamically import the Announcement component with a loading state
const RecordedVideo = dynamic(() => import('@/app/components/common/RecordedVideo'), {
  loading: () => <Loader />,  // This is the fallback loading component
  ssr: false,                 // Disable server-side rendering (optional)
});

export default function RecordedVideosPage() {

  const { studentState } = useContext(StudentLoginContext);
  const router = useRouter();
  useEffect(() => {

    if (!studentState?.token) {
      router.push('/studentLogin');
    }
  }, [studentState?.token, router]);

  return (
    <Suspense fallback={<Loader/>}>
      <RecordedVideo/>
    </Suspense>
  )
}

