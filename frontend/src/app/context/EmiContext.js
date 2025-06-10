"use client"
import React, { createContext, useReducer } from 'react'

let data=""

export const EmiContext = createContext()

function reducer(state,action){
    switch (action.type) {
        case "CREATE_EMI":
            
            return;

        case "GET_EMI":
            const newState =action.payload
            
            return newState;

        case "UPDATE_EMI":
            return;

        case "DELETE_EMI":
            return;
    
        default:
            return;
    }
}

export const EmiContextProvider = ({children}) => {

  const [state, emiDispatch] = useReducer(reducer, data);
  return (
    <EmiContext.Provider value={{emiData:state,emiDispatch}}>
        {children}
    </EmiContext.Provider>
  )
}
