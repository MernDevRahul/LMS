"use client"
import { GetStorage } from "@/utils/Services/Storage";
import React, { Children, createContext, useEffect, useReducer, useState } from "react";

let data =[]

export const RoleContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_ROLE":

      return;
    case "GET_ROLE":
        const newState1 = action.payload
      return newState1;
    case "UPDATE_ROLE":
      return;
    default:
      return;
  }
}

export const RoleContextProvider=({children})=> {
  const [state, dispatch] = useReducer(reducer, data);
  return(
    <RoleContext.Provider value={{roleData:state,dispatch}}>
        {children}
    </RoleContext.Provider>
  )
   
}
