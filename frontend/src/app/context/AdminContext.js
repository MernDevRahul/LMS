"use client";
import { GetStorage, SetStorage } from "@/utils/Services/Storage";
import { API } from "@/utils/Utils";
import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";

export const MainAdminContext = createContext();


async function getOTP(state, email) {
  const response = await API.get(`/api/auth/admin/otp?email=${email}`);
  return response.data;
}

async function loginAdmin(state,body) {

  API.interceptors.request.use((req)=>{
    req.headers.authorization = `bearer ${state.token}`
    return req;
})  
console.log(body);

  const response = await API.post(  
    "/auth/admin/loginAdmin/",
    body
  );
  // console.log("ok1");
  return response.data;
}

function reducer(state, action) {
  switch (action.type) {
    case "MAIN_ADMIN":
      const MainAdminLogin = { ...action.payload };
      SetStorage("MainAdminToken",MainAdminLogin)
      return MainAdminLogin;
    default:
      return state;
  }
}

export const MainAdminProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      return GetStorage("MainAdminToken") || {};
    }
    return {};
  });

  useEffect(() => {
    setData(GetStorage("MainAdminToken"));
  }, []);
  
  const [state, dispatch] = useReducer(reducer, data);
  return (
    <MainAdminContext.Provider
      value={{ adminState: state, dispatch, loginAdmin, getOTP }}
    >     
      {children}
    </MainAdminContext.Provider>
  );
};
