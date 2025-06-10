"use client"
import React, { useContext, useEffect } from 'react'
import StudyMaterial from '@/app/components/common/StudyMaterial'
import { StudentLoginContext } from '@/app/context/StudentLoginContext';
import { useRouter } from 'next/navigation';

export default function StudyMaterialPage() {
      const { studentState } = useContext(StudentLoginContext);
      const router = useRouter();
    
      useEffect(() => {
    
        if (!studentState?.token) {
          router.push('/studentLogin');
          // toast.success("You are logged in!");
        }
      }, [studentState?.token, router]);
  
  return (
    <StudyMaterial/>
  )
}
