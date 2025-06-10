"use client";
import { useState, useEffect, useContext } from "react";
import React from "react";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";
import { MainAdminContext } from "@/app/context/AdminContext";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";

export default function AdminLoginForm() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [UserData, setUserData] = useState({ Email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [hashedOtp, setHashedOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const { loginAdmin, getOTP, dispatch,adminState } = useContext(MainAdminContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("MainAdminToken");
    if (token) {
      router.replace("/adminDashboard");
    }else{
      router.replace("/administratorLogin")
    }
  }, [router]);

  async function handleSubmit() {
    if (!UserData.Email) {
      toast.error("Email is required.");
      return;
    }

    const loadingToast = toast.loading("Sending OTP..."); // Show loader

    try {
      const data = await getOTP(adminState,UserData.Email);
      if (data?.hashedOtp) {
        setIsOtpSent(true);
        setHashedOtp(data.hashedOtp);
        setTimeLeft(30);
        toast.success("OTP sent to your email!", { id: loadingToast });
      } else {
        throw new Error("Failed to get OTP.");
      }
    } catch (error) {
      toast.error("Email is wrong!", { id: loadingToast });
    }
  }

  async function handleOtpConfirm() {
    if (otp.length !== 4) {
      toast.error("Please enter a 4-digit OTP.");
      return;
    }

    const loadingToast = toast.loading("Verifying OTP...");

    try {
      const match = await bcrypt.compare(otp, hashedOtp);
      if (match) {
        toast.success("OTP Verified!", { id: loadingToast });
        setGenerated(true);
      } else {
        toast.error("Invalid OTP. Try again.", { id: loadingToast });
      }
    } catch (error) {
      toast.error("OTP verification failed.", { id: loadingToast });
    }
  }

  async function handleLogin() {
    if (!UserData.password) {
      toast.error("Enter your password.");
      return;
    }

    const loadingToast = toast.loading("Logging in...");

    try {
      const data = await loginAdmin(adminState, UserData);
      if (data) {
        dispatch({ type: "MAIN_ADMIN", payload: data });
        router.replace("/adminDashboard");
        toast.success("You are logged in successfully!", { id: loadingToast });
      } else {
        toast.error("Invalid credentials.", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Password is incorrect.", { id: loadingToast });
    }
  }

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <>
      <div className="text-center">
        <div className="text-white">
          <div className="icon-container mb-2">
            <img style={{ width: "70px", height: "auto" }} src="/Avatar/admin.png" alt="Admin" />
          </div>
          <h6>Admin</h6>
        </div>
      </div>

      <h5 className="text-white text-center">
        {!isOtpSent ? "Login into your account" : !generated ? "OTP Verification" : "Enter Your Password"}
      </h5>

      <form className="w-100" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          {!isOtpSent ? (
            <input
              style={{ padding: "10px 15px", fontSize: "1rem" }}
              type="email"
              className="form-control"
              placeholder="Enter your email"
              autoComplete="off"
              value={UserData.Email}
              onChange={(e) => setUserData({ ...UserData, Email: e.target.value.toLocaleLowerCase() })}
            />
          ) : !generated ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                inputStyle={{
                  width: "50px",
                  height: "50px",
                  fontSize: "20px",
                  textAlign: "center",
                  margin: "0 5px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} className="otp-input" />}
              />

              {/* Resend OTP Button */}
             
            </div>
          ) : (
            <div>
              <input
                style={{ padding: "10px 15px", fontSize: "1rem" }}
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                autoComplete="off"
                value={UserData.password}
                onChange={(e) => setUserData({ ...UserData, password: e.target.value })}
              />
              <div className="d-flex align-items-center mt-2">
                <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                <label htmlFor="showPassword" className="mx-2 text-white">
                  Show Password
                </label>
              </div>
            </div>
          )}
        </div>

        {!isOtpSent ? (
          <button onClick={handleSubmit} className="btn btn-success w-100">
            <h6>Submit</h6>
          </button>
        ) : !generated ? (
          <>
            <button onClick={handleOtpConfirm} className="btn btn-danger w-100 mb-2">
              <h6>Confirm OTP</h6>
            </button>
            <button
                onClick={handleSubmit}
                className="btn btn-secondary mt-2 w-100"
                disabled={timeLeft > 0}
              >
                Resend OTP {timeLeft > 0 ? `(${timeLeft}s)` : ""}
              </button>
          </>
        ) : (
          <button className="btn btn-primary w-100" onClick={handleLogin}>
            <h6>Login</h6>
          </button>
        )}
      </form>
    </>
  );
}