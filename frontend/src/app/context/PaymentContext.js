"use client"
import React, { createContext, useReducer } from "react";

let data =[]
export const PaymentContext = createContext();

function reducer(state,action) {
  switch (action.type) {
    case "CREATE_PAYMENT":
      return;

    case "GET_PAYMENT":
      const newState = action.payload;
      return newState;

    case "UPADATE_PAYMENT":
      return;

    case "DELETE_PAYMENT":
      return;

    default:
      return;
  }
}

export default function PaymentContextProvider({ children }) {
  const [state, paymentDispatch] = useReducer(reducer, data);
  return (
  <PaymentContext.Provider value={{paymentData:state,paymentDispatch}}>
    {children}
  </PaymentContext.Provider>)
}
