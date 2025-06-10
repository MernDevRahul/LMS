
import { MainAdminContext } from "@/app/context/AdminContext";
import { EmployeeContext } from "@/app/context/EmployeeContext";
import React, { useContext } from "react";

const EmployeeStatusDropdown = ({ employee, handleChangeStatus }) => {


  const handleStatusClick = (status) => {// Log selected status to the console
    handleChangeStatus(employee._id, status); // Call parent function to update status
  };
  return (
    <span className={`status status-${employee.Status}`}>
      <span className="dropdown">
        <button
          className="border-0 text-right bg-transparent fw-bold btn-sm me-2 dropdown-toggle"
          type="button"
          id={`dropdown-${employee._id}`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {employee.Status
            ? employee.Status.charAt(0).toUpperCase() + employee.Status.slice(1)
            : "Active"}
        </button>
        <ul className="dropdown-menu" aria-labelledby={`dropdown-${employee._id}`}>
          {["active", "inactive", "suspended"].map((status) => (
            <li key={status}>
              <button
                className="dropdown-item"
                onClick={() => handleStatusClick(status)} // Call the function with selected status
                // onClick={()=> handleChange(idx,status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </span>
    </span>
  );
};

export default EmployeeStatusDropdown;
