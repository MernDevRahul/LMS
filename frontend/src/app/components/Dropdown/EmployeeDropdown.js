import { getAllEmp } from "@/app/api/employeeApi";
import { MainAdminContext } from "@/app/context/AdminContext";
import { UserContext } from "@/app/context/UserContext";
import React, { useState, useEffect, useContext } from "react";


function EmployeeDropdown({ disable, onSelectionChange }) {
  const { state } = useContext(UserContext);
  const { adminState } = useContext(MainAdminContext);
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState([]);

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        let result;
        if (!adminState.token) result = await getAllEmp(state);
        else result = await getAllEmp(adminState);
        const trainers = result.filter((emp) => emp.Role === "TRNR"); // Filter employees with role TRNR
        
        setEmployees(trainers);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchEmployees();
  }, [state, adminState?.token]);

  // Update selected employees and notify parent
  const handleCheckboxChange = (employeeId) => {
    const updatedSelected = selected.includes(employeeId)
      ? selected.filter((id) => id !== employeeId)
      : [...selected, employeeId];
    setSelected(updatedSelected);
    // Notify parent component about the change
    if (onSelectionChange) {
      onSelectionChange(updatedSelected); // Pass selected employee IDs to parent
    }
    console.log(updatedSelected);
    
  };

  return (
    <div className="input-group m-0 p-0">
      <div className="input-group-append">
        <button
          className="btn btn-dark dropdown-toggle border-0"
          type="button"
          id="dropdownMenuButton"
          disabled={disable}
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{ borderRadius: "0", border: "1px solid #dee2e6" }}
        ></button>

        <div
          className="dropdown-menu w-100 scroll-thumb"
          aria-labelledby="dropdownMenuButton"
          style={{
            transform: "translate(0px,40px)",
            height: "185px",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {employees.map((employee) => (
            <div key={employee._id} className="dropdown-item" title={employee["First Name"]}>
              <div className="form-check position-relative">
                <input
                  type="checkbox"
                  id={`checkbox-${employee._id}`}
                  name={`checkbox-${employee._id}`}
                  className="form-check-input shadow-none"
                  value={employee._id}
                  style={{ cursor: "pointer" }}
                  checked={selected.includes(employee._id)}
                  onChange={() => handleCheckboxChange(employee._id)}
                  autoComplete="off"
                />
                <label
                  htmlFor={`checkbox-${employee._id}`}
                  className="form-check-label d-flex justify-content-between"
                  style={{ cursor: "pointer" }}
                >
                  <span>{employee["Email"]}</span> <span>{employee.role}</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <input
        type="text"
        id="EmployeeInput"
        name="EmployeeInput"
        className="form-control shadow-none bg-transparent border-0 rounded-0"
        placeholder="Select Employees"
        value={selected
          .map((id) => employees.find((employee) => employee._id === id)?.["First Name"])
          .filter(Boolean)
          .join("  |  ")} // Display the employee name
        readOnly
      />
    </div>
  );
}

export default EmployeeDropdown;
