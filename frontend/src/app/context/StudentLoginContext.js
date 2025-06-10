"use client"

import { GetStorage, removeStorage, SetStorage } from '@/utils/Services/Storage'
import React, { createContext, useEffect, useReducer, useState } from 'react'


export const StudentLoginContext = createContext()

function reducer(state,action){
    switch (action.type) {
        case "LOGIN_STUDENT":
            const newState = {...action.payload }
            console.log(newState);     
            SetStorage("StudentToken",newState)
            return newState;
          
        case "LOGOUT_STUDENT": 
        console.log("Hello");
        
        removeStorage("StudentToken")
        return state
    
        default:
            return state;
    }
}

export const StudentLoginContextProvider = ({children}) => {
    const [data, setData] = useState(() => {
        if (typeof window !== "undefined") {
          return GetStorage("StudentToken") || {};
        }
        return {};
      });
    
      useEffect(() => {
        setData(GetStorage("StudentToken"));
      }, []);
    const [state, studentLoginDispatch] = useReducer(reducer,data)
  return (
    <StudentLoginContext.Provider value={{studentState:state, studentLoginDispatch}}>
        {children}
    </StudentLoginContext.Provider>
  )
}