// "use client";
// import React, { useState, useEffect, useContext, Suspense } from "react";
// import { getAllStd, updateStd } from "@/app/api/studentApi"; 

// import { UserContext } from "@/app/context/UserContext";
// import { MainAdminContext } from "@/app/context/AdminContext";
// import { StudentContext } from "@/app/context/StudentContext";
// import dynamic from "next/dynamic";
// import Loader from "@/app/components/common/Loader";

// const StudentTable = dynamic(() => import("@/app/components/table/StudentTable"), {
//   loading: () => {<Loader/>},  // You can display a loading message or spinner here
//   ssr: false,
// });

// export default function NewAdmissionPage() {
//   const { state } = useContext(UserContext);
//   const { adminState } = useContext(MainAdminContext);
//   const{studentData,studentDispatch} = useContext(StudentContext)
//   const [students, setStudents] = useState([]);

// async function fetchStudent() {
//     try {
//       let data = adminState.token == "undefined" ? 
//       await getAllStd(state) : await getAllStd(adminState);

//       if(studentData){
//           studentDispatch({
//             type:"GET_STUDENT",
//             payload:data
//           })
//       }
//     } catch (error) {
//       console.log(error); 
//     }
// }

// useEffect(()=>{
//   fetchStudent();
// },[])


//   const updateStdData = async (studentId, updatedData) => {
//     try {
//       // Make the API call to update the student
//       if(!adminState.token)
//       await updateStd(state,studentId, updatedData);
//       else
//       await updateStd(adminState,studentId, updatedData);
//     } catch (error) {
//       console.error("Error updating student data:", error);
//     }
//   };

//   const handleCourseSelectionChange = (id,index,selectedCourses) => {
//     // If selectedCourses is valid and contains 'fee', the following will work
//     const updatedstudents = [...students];
//     const totalFee = selectedCourses.reduce((sum, course) => sum + (course["Course Fee"] || 0), 0);

//     updatedstudents[index].Course = selectedCourses.map((course) => course.Abbreviation);
//     updatedstudents[index].Fee = totalFee;
//     // Call your update function to sync with backend or state management
//     updateStdData(id, { 
//       Course: selectedCourses.map((course) => course.Abbreviation),
//       Fee: totalFee 
//     });

//     setStudents(updatedstudents);
//   };

//   return (
//     <Suspense fallback={<Loader/>}>
//         <StudentTable 
//           StdData={students} 
//           fetchStudent={fetchStudent}
//           setStudents={setStudents}
//           updateStdData={updateStdData}
//           handleCourseSelectionChange={handleCourseSelectionChange}
//         />
//     </Suspense>           
//   )
// }



"use client";
import React, { useEffect, useContext, Suspense } from "react";
import { useRouter } from "next/navigation";
import { getAllStd } from "../../../api/studentApi";
import { getAllPayment } from "../../../api/paymentApi";

import { UserContext } from "../../../context/UserContext";
import { MainAdminContext } from "../../../context/AdminContext"
import { StudentContext } from "../../../context/StudentContext";
import { PaymentContext } from "../../../context/PaymentContext";

import Loader from "../../../components/common/Loader";
import dynamic from "next/dynamic";

const StudentTable = dynamic(() => import("@/app/components/table/StudentTable"), {
  loading: () => { <Loader /> },  // You can display a loading message or spinner here
  ssr: false,
});


export default function NewAdmission() {
  const { state } = useContext(UserContext);
  const { adminState } = useContext(MainAdminContext);
  const { studentData, studentDispatch } = useContext(StudentContext);
  const { paymentDispatch } = useContext(PaymentContext);
  const router = useRouter()

  async function fetchStudent() {
    try {
      let studentResponse = adminState.token == "undefined" ?
        await getAllStd(state) : await getAllStd(adminState);

      let paymentResponse = adminState.token == "undefined" ?
        await getAllPayment(state) : await getAllPayment(adminState);


      if (studentData) {
        studentDispatch({
          type: "GET_STUDENT",
          payload: studentResponse
        })
      }

      if (paymentResponse) {
        paymentDispatch({
          type: "GET_PAYMENT",
          payload: paymentResponse,
        });
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStudent();
  }, [])
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!state.token) {
        router.push("/"); // Redirect to dashboard if logged in        
      }
    }
  }, [state?.token, router]);

  return (
    <Suspense fallback={<Loader />}>

      <div className="mt-3">
        <StudentTable
        // StdData={students} 
        // fetchStudent={fetchStudent}
        // setStudents={setStudents}
        // updateStdData={updateStdData}
        // handleCourseSelectionChange={handleCourseSelectionChange}
        />
      </div>

    </Suspense>
  )
}
