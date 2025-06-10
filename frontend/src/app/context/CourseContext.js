"use client"
import React, { useReducer } from "react";
import { createContext } from "react";

let data =[]

export const CourseContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_COURSE":
      return;

    case "UPDATE_COURSE":
      return;

    case "DELETE_COURSE":
      return;

    case "GET_COURSE":
      const newState=action.payload
      return newState;

    default:
      return;
  }
}

export const CourseContextProvider = ({ children }) => {
  const [state, courseDispatch] = useReducer(reducer,data);
  return (
    <CourseContext.Provider value={{courseData: state, courseDispatch}}>
      {children}
    </CourseContext.Provider>
  );
};
