"use client"
import React from 'react'
import Login from '../components/Auth/Login'
import StudentLoginForm from '../components/Form/StudentLoginForm'

export default function page() {
  return (
      <Login>
          <StudentLoginForm/>
     </Login> 
  )
}
