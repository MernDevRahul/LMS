"use client";
import { useContext, useState, useEffect } from "react";
import React from "react";
import RoleDropdown from "../Dropdown/RoleDropdown";
import toast from "react-hot-toast";
import { UserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

export default function EmployeeLoginForm() {
  const [userType, setUserType] = useState("faculty");
  
  const [UserData, setUserData] = useState({
    Email: "",
    Password: "",
    Role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { EmployeeLogin, dispatch, state } = useContext(UserContext);
  const router = useRouter();

  
  useEffect(() => {
    if (state && state.Role) {
      if (state.Role === "HR" || state.Role === "CNSLR") {
        // toast.success("You are already logged in");
        router.replace("/counselorDashboard");
      } else {
        // toast.success("You are already logged in");
        router.replace("/facultyDashboard");
      }
    }
  }, [state,router]);



  async function handleSubmit() {
    if (
      UserData.Email !== "" &&
      UserData.Password !== "" &&
      UserData.Role !== ""
    ) {
      try {
        const data = await EmployeeLogin(state, UserData);
        console.log(data);
        
        if (data && data.token) {
          dispatch({
            type: "ADD_USER",
            payload: data,
          });

          if (UserData.Role === "CNSLR" || UserData.Role === "HR") {
            router.push("/counselorDashboard");
            toast.success("You are logged in successfully!");
          } else {
            router.replace("/facultyDashboard");
            toast.success("You are logged in successfully!");
          }
        } else {
          toast.error(
            data?.msg || "Unexpected error occurred, please try again later."
          );
        }
      } catch (error) {
        // console.log(error);
        toast.error(
          error.response?.data || "Login failed. Please check your credentials."
        );
      }
    }

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...UserData, [name]: value });
  };

  return (
    <>
      <div className="text-center position-relative w-100">
        <div className="text-white">
          <div className="icon-container mb-2">
            <img
              style={{ width: "70px", height: "auto" }}
              src="/Avatar/faculty.png"
              alt="Faculty"
            />
          </div>
          <h6>Employee</h6>
        </div>
      </div>

      <h1 className="text-white text-center fs-5">Login into your account</h1>

      <form className="w-100" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <input
            // style={{ padding: "15px 20px", fontSize: "1rem" }}
            id="email"
            type="email"
            name="Email"
            value={UserData.Email.toLowerCase()}
            className="form-control"
            placeholder="Enter your email"
            required
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            // style={{ padding: "15px 20px", fontSize: "1rem" }}
            id="password"
            name="Password"
            value={UserData.Password}
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Enter your password"
            required
            autoComplete="off"
            onChange={handleChange}
          />
          <div
            className="mt-1"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              style={{ width: "15px", height: "15px" }}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label
              htmlFor="showPassword"
              style={{ color: "white", paddingTop: "7px" }}
              className="mx-1"
            >
              <h6>Show Password</h6>
            </label>
          </div>
        </div>

        {userType === "faculty" && (
          <div className="" style={{color:'white'}}>
            <RoleDropdown formData={UserData.Role} handleChange={handleChange} />
          </div>
        )}

        <button
          style={{ fontWeight: "600px" }}
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary w-100 py-2"
        >
          <h6>Login</h6>
        </button>
      </form>
    </>
  )
}
