"use client"
import React, { useContext } from "react";

import toast from "react-hot-toast";
import { UserContext } from "@/app/context/UserContext";
import { MainAdminContext } from "@/app/context/AdminContext";
import { StudentLoginContext } from "@/app/context/StudentLoginContext";
import { useRouter } from "next/navigation";




export default function NavbarLayout({ toggleSidebar, selectedMenu }) {
  const { state } = useContext(UserContext)
  const { adminState } = useContext(MainAdminContext)
  const { studentState } = useContext(StudentLoginContext)
  const router = useRouter();


  function logoutHandler() {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    let EmployeToken = localStorage.getItem("EmployeToken")
    let MainAdminToken = localStorage.getItem("MainAdminToken")
    let StdToken = localStorage.getItem("StudentToken")

    if (confirmLogout) {
      if (EmployeToken) {
        localStorage.removeItem("EmployeToken");
        toast.success("Logged out successfully!");
        window.location.reload()
        router.push("/")
      }

      if (MainAdminToken) {
        localStorage.removeItem("MainAdminToken");
        toast.success("Logged out successfully!");
        window.location.reload()
        router.push("/administratorLogin")
      }

      if (StdToken) {
        localStorage.removeItem("StudentToken");
        toast.success("Logged out successfully!");
        window.location.reload()
        router.push("/studentLogin")
      }
    }
  }


  return (
    <>
      <nav className="navbar navbar-expand fixed-top bg-white py-1 px-3 shadow-sm border-bottom">
        <div className="navbar-collapse collapse">
          <button
            className="toggle-btn sidebar-Toggler ps-0"
            type="button"
            onClick={toggleSidebar}
          >
            <i className="bi bi-grid-fill text-dark"></i>
          </button>

          <ul className="navbar-nav ms-auto ms-sm-0">
            <li className="nav-item dropdown">
              <h6 className="selectedMenu mb-0">
                {selectedMenu || "Dashboard"} {/* Display the selected menu */}
              </h6>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                <img src="/Avatar/profile.png" alt="" className="avatar img-fluid" />
              </a>

              <div className="dropdown-menu px-2 dropdown-left">

                <button className="dropdown-item d-flex align-items-center rounded" type="button">
                  <i className="bi bi-person"></i>
                  {
                    state?.token ?
                      `${state["First Name"]} (${state?.Role})`
                      : adminState?.token ?
                        `${adminState?.["First Name"]} (${adminState?.Role})`
                        :
                        studentState?.token ?
                          `${studentState?.['Name']}`
                          :
                          "User"
                  }
                </button>

                <button className="dropdown-item d-flex align-items-center rounded" type="button">
                  <i className="bi bi-gear"></i> Settings
                </button>

                <button className="dropdown-item d-flex align-items-center rounded text-danger"
                  style={{ cursor: "pointer", background: " #ff000025" }}
                  onClick={logoutHandler}
                  title="Logout"
                  type="button">
                  <i className="bi bi-box-arrow-left"></i> Logout
                </button>

              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
