"use client"
import React, { useContext, useEffect } from 'react'
import LeadsPage from './LeadsPage'
import { UserContext } from '@/app/context/UserContext'
import { useRouter } from 'next/navigation'

export default function page() {
  const {state} = useContext(UserContext)
  const router = useRouter()

  useEffect(()=>{
    if(state?.token){
      router.push("/counselorDashboard/Leads")
    }else{
      router.push("/")
    }
  },[])
  return (
    <LeadsPage/>
  )
}
