"use client"
import { useContext, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Loader from '@/app/components/common/Loader';
import { StudentLoginContext } from '@/app/context/StudentLoginContext';

// Dynamically import the Announcement component with a loading state
const Announcement = dynamic(() => import('@/app/components/common/Announcement'), {
  loading: () => <Loader />,  // This is the fallback loading component
  ssr: false,  // Disable server-side rendering (optional)
});

export default function AnnouncementPage() {
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
      <Announcement />
    </Suspense>
  );
}
