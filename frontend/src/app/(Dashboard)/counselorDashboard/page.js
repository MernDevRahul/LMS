"use client"
import { UserContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

export default function Adminpage() {
  const { state } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (state && state.Role) {
      if (state.Role !== "CNSLR" && state.Role !== "HR") {
        router.replace('/');
      } else {
        const handlePopState = () => {
          if (state.Role === 'CNSLR' || state.Role === "HR") {
            router.replace('/counselorDashboard');
          }
        };
        window.onpopstate = handlePopState;
        return () => {
          window.onpopstate = null;
        };
      }
    } else {
      router.replace("/");
    }
  }, [state, router]);



  return (
    <div>
      Counselor Dashboard
    </div>
  )
}
