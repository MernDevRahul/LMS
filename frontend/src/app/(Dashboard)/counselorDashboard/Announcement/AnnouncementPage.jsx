"use client"
import { useContext, useEffect, Suspense } from 'react';
import { UserContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/common/Loader';
import dynamic from 'next/dynamic';

// Dynamically import the Announcement component with a loading state
const Announcement = dynamic(() => import('@/app/components/common/Announcement'), {
  loading: () => <Loader />,  // This is the fallback loading component
  ssr: false,  // Disable server-side rendering (optional)
});

export default function AnnouncementPage() {
  const { state } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!state.token) {
        router.push("/"); // Redirect to dashboard if logged in        
      }
    }
  }, [state?.token, router]);

  return (
    <Suspense fallback={<Loader />}>
      <Announcement />
    </Suspense>
  );
}
