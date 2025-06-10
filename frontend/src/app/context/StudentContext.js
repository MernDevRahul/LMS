"use client"
import React, { createContext, useReducer } from 'react'

let data =[]
export const StudentContext = createContext()

function reducer(state,action){
    switch (action.type) {
        case "GET_STUDENT":
            const newState = action.payload           
            return newState;
    
        default:
            return state;
    }
}
export const StudentContextProvider = ({children}) => {
    const [state, studentDispatch] = useReducer(reducer,data)
  return (
    <StudentContext.Provider value={{studentData:state, studentDispatch}}>
        {children}
    </StudentContext.Provider>
  )
}
