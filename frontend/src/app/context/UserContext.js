"use client";
import { GetStorage, SetStorage } from "@/utils/Services/Storage";
import { API } from "@/utils/Utils";
import React, { createContext, useEffect, useReducer, useState } from "react";

let data = {};

export const UserContext = createContext();

async function EmployeeLogin(state, body) {
  API.interceptors.request.use((req) => {
    req.headers.authorization = `bearer ${state.token}`;
    return req;
  });
  const response = await API.post("/api/employee/login", body);
  //   console.log(response?.data)
  return response?.data;
}

// async function getOTP(email){
//     console.log("kya re chikne");

//     API.interceptors.request.use((req)=>{
//         req.headers.authorization = `bearer ${state.token}`
//         return req;
//     })
//     const response = await axios.get(`http://localhost:8000/auth/admin/otp?email=${email}`)
//     return response.data

// }

// async function loginAdmin(body){
//     // console.log(body);
//     const response = await axios.post("http://localhost:8000/auth/admin/loginAdmin",body)
//     // console.log(response)
//     return response.data
// }

function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      const LoginEmployee = { ...action.payload };
      // localStorage.setItem("EmployeToken",JSON.stringify(LoginEmployee));
      SetStorage("EmployeToken", LoginEmployee);
      return LoginEmployee;
    default:
      return state;
  }
}

export const UserContextProvider = ({ children }) => {
  // Initialize data here instead
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      return GetStorage("EmployeToken") || {};
    }
    return {};
  });

  useEffect(() => {
    setData(GetStorage("EmployeToken"));
  }, []);

  const [state, dispatch] = useReducer(reducer, data);
  
  return (
    <UserContext.Provider value={{ state, dispatch, EmployeeLogin }}>
      {children}
    </UserContext.Provider>
  );
};
