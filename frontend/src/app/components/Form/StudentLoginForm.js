"use client";
import { loginStd } from "@/app/api/studentApi";
import { StudentLoginContext } from "@/app/context/StudentLoginContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";

export default function StudentLoginForm() {
  // ============== Context ==============================================
  const {studentLoginDispatch} = useContext(StudentLoginContext)
  // ============== State ==============================================
  const [UserData, setUserData] = useState({"Email id":"",Password:""})
  const [showPassword, setShowPassword] = useState(false);

  // ============== Route ==============================================
  const router = useRouter()

  
  useEffect(() => {
    const token = localStorage.getItem("StudentToken");
    if (token) {
      router.replace("/studentDashboard");
    }else{
      router.replace("/studentLogin")
    }
  }, [router]);

  async function handleSumbit(e){
    e.preventDefault();
    try {
      if(UserData["Email id"] && UserData.Password){
        const data = await loginStd(UserData);
        if(data){
          studentLoginDispatch({
            type:"LOGIN_STUDENT",
            payload:data
          })
          router.push("/studentDashboard"); 
          toast.success("You are logged in successfully!", { id: "loginToast" });
        }
      }else{
        toast.error("All fields are required.") 
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="text-center position-relative w-100">
        <div className="text-white ">
              <div className="icon-container  mb-2">
                <img
                 style={{ width: "70px", height: "auto" }}
                src="/Avatar/student.png" alt="Faculty" />
              </div>
              <h6>Student</h6>
            </div>
      </div>

      <h1 className="text-white text-center fs-5">Login into your account</h1>

      <form className="w-100" onSubmit={handleSumbit}>
        <div className="mb-3">
          <input
            style={{ padding: "8px 20px", fontSize: "1rem" }}
            id="email id"
            onChange={(e)=>{
              setUserData((prev)=>{return {...prev, "Email id":e.target.value}})
            }}
            type="email"
            value={UserData["Email id"].toLowerCase()}
            className="form-control"
            placeholder="Enter your email"
            required
            autoComplete="off"
          />
        </div>

         
          <div className="mb-3">
          <input
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, Password: e.target.value }));
            }}
            style={{ padding: "8px 20px", fontSize: "1rem" }}
            id="password"
            value={UserData.Password.toUpperCase()}
            type={showPassword ? "text" : "password"}  
            className="form-control"
            placeholder="Enter your password"
            required
            autoComplete="off"
          />

          <div className="mt-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" style={{ color: "white" }} className="mx-2">
              <p className="m-0">Show Password</p>
            </label>
          </div>
        </div>

      
      
        <button style={{fontWeight:'600px'}} type="submit" className="btn btn-primary w-100 py-2">
          Login
        </button>
      </form>

      {/* CSS Styles */}
      <style jsx>{`
        .text-center {
          position: relative;
        }

        .role-selection {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          padding: 10px;
          border-radius: 10px;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .border-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50%;
          height: 2px;
          background-color: rgb(0, 255, 17);
          transition: transform 0.3s ease-in-out;
        }

        .d-flex {
          display: flex;
          justify-content: space-between;
        }

        .option-container {
          text-align: center;
          cursor: pointer;
          padding: 15px;
          width: 50%;
          transition: color 0.3s ease;
          font-size: 1.1rem;
          font-weight: bold;
        }

        .option-container:hover,
        .option-container.active {
          color: rgb(0, 255, 17);
        }

        .icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 5px;
        }

        .icon-container img {
          width: 70px;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .role-selection {
            max-width: 300px;
          }
          .border-indicator {
            height: 3px;
          }
          .option-container {
            font-size: 1rem;
            padding: 10px;
          }
          .icon-container img {
            width: 60px;
          }
        }

        @media (max-width: 480px) {
          .role-selection {
            max-width: 250px;
          }
          .border-indicator {
            height: 2px;
          }
          .option-container {
            font-size: 0.9rem;
            padding: 8px;
          }
          .icon-container img {
            width: 50px;
          }
        }
       .middle-border {
  border-left: 1px solid rgba(255, 255, 255, 0.2); /* Transparent white */
  height: 50px;
  // margin-top: 25px;
}
      `}</style>
    </>
  );
}