"use client"
import { useContext, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Loader from '@/app/components/common/Loader';
import { MainAdminContext } from '@/app/context/AdminContext';

// Dynamically import the Announcement component with a loading state
const Announcement = dynamic(() => import('@/app/components/common/Announcement'), {
  loading: () => <Loader />,  // This is the fallback loading component
  ssr: false,  // Disable server-side rendering (optional)
});

export default function AnnouncementPage() {
  const { adminState } = useContext(MainAdminContext);
  const router = useRouter();

  useEffect(() => {

    if (!adminState?.token) {
      router.push('/administratorLogin');
      // toast.success("You are logged in!");
    }
  }, [adminState?.token, router]);

  return (
    <Suspense fallback={<Loader/>}>
      <Announcement />
    </Suspense>
  );
}
