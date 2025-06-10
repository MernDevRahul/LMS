"use client"
import React, { createContext, useReducer } from 'react'

let data=[]

function reducer(state,action){
    switch (action.type) {
        case "GET_EMPLOYEE":
        const newState = action.payload
            return newState;

        case "EDIT_EMPLOYEE":
        let newState1 = [...state]
        newState1[action.payload.ind][action.payload.field] = action.payload.data
        console.log(newState1); 
        return newState1;

    
        default:
            return;
    }
}

export const EmployeeContext = createContext()

export const EmployeeContextProvider=({children})=> {
  const [state, employeeDispatch] = useReducer(reducer, data);
  return (
    <EmployeeContext.Provider value={{employeeData:state, employeeDispatch}}>
        {children}
    </EmployeeContext.Provider>
)
}
