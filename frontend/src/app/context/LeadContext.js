"use client"
import { GetStorage, SetStorage } from "@/utils/Services/Storage";
import { createContext, useEffect, useReducer, useState } from "react";
export const LeadContext = createContext();
  let data=[]

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_LEAD":
      return;

    case "GET_LEAD":
      const newState1 = [...action.payload]
      return newState1;

    case "FILTER_LEAD":
      const newState2 = [...action.payload]
          console.log(newState2);
      return newState2;

    case "UPDATE_LEAD":
      const newState3 = [...state]
      // newState3[]
      return;

    default:
      return;
  }
}

export const LeadContextProvider = ({children}) => {
    const [state, leadDispatch] = useReducer(reducer, data);
  return (
    <LeadContext.Provider value={{leadData:state, leadDispatch}}>
      {children}
    </LeadContext.Provider>
  );
};
