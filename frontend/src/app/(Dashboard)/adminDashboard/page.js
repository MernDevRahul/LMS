"use client";
// import { getAllCourse } from "@/app/api/courseApi";
// import { getAllEmi } from "@/app/api/emiApi";
// import { getAllEmp } from "@/app/api/employeeApi";
// import { getAllLead } from "@/app/api/leadApi";
// import { getAllPayment } from "@/app/api/paymentApi";
// import { getAllRole } from "@/app/api/roleApi";
// import { getAllStd } from "@/app/api/studentApi";
// import { CourseContext } from "@/app/context/CourseContext";
// import { EmiContext } from "@/app/context/EmiContext";
// import { EmployeeContext } from "@/app/context/EmployeeContext";
// import { LeadContext } from "@/app/context/LeadContext";
// import { PaymentContext } from "@/app/context/PaymentContext";
// import { RoleContext } from "@/app/context/RoleContext";
// import { StudentContext } from "@/app/context/StudentContext";
// import toast from "react-hot-toast";
import Loader from "@/app/components/common/Loader";
import WorkReportpage from "@/app/components/common/workReport";
import { MainAdminContext } from "@/app/context/AdminContext";
import { useRouter } from "next/navigation";
import React, { Suspense, useContext, useEffect } from "react";

export default function Adminpage() {
  // const [isLoading, setIsLoading] = useState(false);
  // const { courseDispatch } = useContext(CourseContext);
  // const { emiDispatch } = useContext(EmiContext);
  // const { employeeDispatch } = useContext(EmployeeContext);
  // const { leadDispatch } = useContext(LeadContext);
  // const { paymentDispatch } = useContext(PaymentContext);
  // const { dispatch } = useContext(RoleContext);
  // const { studentDispatch } = useContext(StudentContext);
  
  const { adminState } = useContext(MainAdminContext);
  const router = useRouter();
  
  // ================= Fetch All Data =============================================

  // async function fetchAllData() {
  //   try {
  //     setIsLoading(true);
  //     // if(adminState?.token){
  //     //   const [leadResponse, paymentResponse, courseResponse,emiResponse,employeeResponse,roleResponse, studentResponse]=
  //     //   await Promise.all([
  //     //     getAllCourse(adminState),
  //     //     getAllEmi(adminState),
  //     //     getAllEmp(adminState),
  //     //     getAllLead(adminState),
  //     //     getAllPayment(adminState),
  //     //     getAllRole(adminState),
  //     //     getAllStd(adminState)
  //     //   ])

  //     //   if(courseResponse){
  //     //     courseDispatch({
  //     //       type:"GET_COURSE",
  //     //       payload:courseResponse
  //     //     })
  //     //   }
  //     //   if(emiResponse){
  //     //     emiDispatch({
  //     //       type:"GET_EMI",
  //     //       payload:emiResponse
  //     //     })
  //     //   }
  //     //   if(employeeResponse){
  //     //     employeeDispatch({
  //     //       type:"GET_EMPLOYEE",
  //     //       payload:employeeResponse
  //     //     })
  //     //   }
  //     //   if(leadResponse){
  //     //     leadDispatch({
  //     //       type: "GET_LEAD",
  //     //       payload: leadResponse,
  //     //     });
  //     //   }
  //     //   if(paymentResponse){
  //     //     paymentDispatch({
  //     //       type: "GET_PAYMENT",
  //     //       payload: paymentResponse,
  //     //     });
  //     //   }
  //     //   if(roleResponse){
  //     //     studentDispatch({
  //     //       type: "GET_ROLE",
  //     //       payload: roleResponse,
  //     //     });
  //     //   }
  //     //   if(studentResponse){
  //     //     studentDispatch({
  //     //       type: "GET_STUDENT",
  //     //       payload: studentResponse,
  //     //     });
  //     //   }
  //     // }
  //     console.log(adminState);
      

  //     if (adminState?.token) {
  //       setTimeout(async () => {
  //         const [
  //           leadResponse,
  //           paymentResponse,
  //           courseResponse,
  //           emiResponse,
  //           employeeResponse,
  //           roleResponse,
  //           studentResponse,
  //         ] = await Promise.all([
  //           getAllCourse(adminState),
  //           getAllEmi(adminState),
  //           getAllEmp(adminState),
  //           getAllLead(adminState),
  //           getAllPayment(adminState),
  //           getAllRole(adminState),
  //           getAllStd(adminState),
  //         ]);
  //         if (courseResponse) {
  //           courseDispatch({
  //             type: "GET_COURSE",
  //             payload: courseResponse,
  //           });
  //         }
  //         if (emiResponse) {
  //           emiDispatch({
  //             type: "GET_EMI",
  //             payload: emiResponse,
  //           });
  //         }
  //         if (employeeResponse) {
  //           employeeDispatch({
  //             type: "GET_EMPLOYEE",
  //             payload: employeeResponse,
  //           });
  //         }
  //         if (leadResponse) {
  //           leadDispatch({
  //             type: "GET_LEAD",
  //             payload: leadResponse,
  //           });
  //         }
  //         if (paymentResponse) {
  //           paymentDispatch({
  //             type: "GET_PAYMENT",
  //             payload: paymentResponse,
  //           });
  //         }
  //         if (roleResponse) {
  //           studentDispatch({
  //             type: "GET_ROLE",
  //             payload: roleResponse,
  //           });
  //         }
  //         if (studentResponse) {
  //           studentDispatch({
  //             type: "GET_STUDENT",
  //             payload: studentResponse,
  //           });
  //         }
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchAllData();
  // }, []);


  useEffect(() => {   
    if (adminState?.token) {
      router.push("/adminDashboard");
    } else {
      router.push("/administratorLogin");
    }
  }, [adminState?.token]);

  return (
    <>
        <Suspense fallback={<Loader/>}>
          <WorkReportpage />
        </Suspense>
    </>
  );
}
