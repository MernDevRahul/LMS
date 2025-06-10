import { MainAdminContext } from "@/app/context/AdminContext";
import { UserContext } from "@/app/context/UserContext";
import { useContext } from "react";

export const SetStorage = (key, value) => {
  try {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
    return true;
  } catch (error) {
    return false;
  }
};

// export const GetStorage = (key) => {
//  if(key=="EmployeToken"){
//  const employee = JSON.parse(localStorage.getItem("EmployeToken"));
// }

// if(key=="AllEmployee"){
//     const allEmployees = JSON.parse(localStorage.getItem("AllEmployee"));
// }

//   // ============================================================================================
//   if(key=="MainAdminToken"){
//     const admin =  JSON.parse(localStorage.getItem("MainAdminToken"));
//   }

//   // ================================================================================================
//   if(key==""){
//     const student = JSON.parse(localStorage.getItem("studentToken"));
//   }
// if(key==""){
//     const allStudent = JSON.parse(localStorage.getItem("AllStudent"));
// }
//   // =====================================================================================================
//   if(key==""){
//     const allRole = JSON.parse(localStorage.getItem("AllRole"));
// }

//   // =====================================================================================================

//   if(key==""){
//     const payment = JSON.parse(localStorage.getItem("AllPayment"));
// }

//   // =====================================================================================================
//  if(key==""){
//     const leads = JSON.parse(localStorage.getItem("AllLeads"));
// }
//   // ========================================================================================================
//   if(key==""){
//     const courses = JSON.parse(localStorage.getItem("AllCourse"));
// }
//   // ========================================================================================================
//   if(key==""){
//     const emi = JSON.parse(localStorage.getItem("AllEmi"));
// }

//     return {allEmployees,employee,admin,student,allStudent,allRole,payment,leads,courses,emi}
//   // return { admin };
// };


export const GetStorage = (key)=>{
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
}

export const removeStorage= (key)=>{
      localStorage.removeItem(key)
}
const Storage = () => {
  const { adminState } = useContext(MainAdminContext);
  const { state } = useContext(UserContext);

  SetStorage("MainAdminToken", adminState);
  SetStorage("EmployeToken", state);
};
