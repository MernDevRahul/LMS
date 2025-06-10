"use client"
import React, { Suspense } from 'react'
import Login from '../components/Auth/Login'
import AdminLoginForm from '../components/Form/AdminLoginForm'
import Loader from '../components/common/Loader'

export default function page() {
  return (
     <Suspense fallback={<Loader/>}>
      <Login>
          <AdminLoginForm/>
     </Login> 
     </Suspense>
  )
}