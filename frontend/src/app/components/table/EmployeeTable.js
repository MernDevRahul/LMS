"use client";
import { useState, useContext } from "react";
import EditEmployeeFormModal from "../Form/EditEmployeeFormModal";
import EditButton from "../Button/EditButton";
import DeleteButton from "../Button/DeleteButton";
import EmployeeStatusDropdown from "../Dropdown/EmployeeStatusDropdown";
import Link from "next/link";
import { updateEmp, deleteEmp } from "@/app/api/employeeApi";
import toast from "react-hot-toast";
import { MainAdminContext } from "@/app/context/AdminContext";
import { EmployeeContext } from "@/app/context/EmployeeContext";
const EmployeeTable = ({fetchEmployee, onClose}) => {
  const { adminState } = useContext(MainAdminContext);
  const [employees, setEmployees] = useState([]);
  const [editEmployees, setEditEmployees] = useState(null);
  const {employeeData} = useContext(EmployeeContext)
  
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Do you want to delete this employee?");
    if (confirmDelete) {
      try{
        let status = await deleteEmp(adminState, id);
        if(status==200){
          fetchEmployee()
        }
      }
       catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("Failed to delete the employee. Please try again.");
      }
    }
  };


  const handleEdit = (employee) => {
    setEditEmployees(employee); // Set the employee to edit
  };

  const handleSave = async (id, updatedEmployee) => {
    try{
      let status = await updateEmp(adminState, id, updatedEmployee);
      if(status==200){
        console.log("Hello");
        
        fetchEmployee()
      }
    } 
    catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee. Please try again.");
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    try {
      // Optimistically update the local state
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === id ? { ...employee, Status: newStatus } : employee
        )
      );

      // Update on the server
      let status = await updateEmp(adminState, id, { Status: newStatus });
      if(status==200){
        fetchEmployee();

      }
    } 
    catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="border-top">
      <div
        className="table-responsive"
        style={{ overflowX: "auto", height: "calc( 100vh - 160px)" }}
      >
          <table
            className="table table-hover"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr>
                <th style={{ background: "#f288ff" }}>Sr</th>
                <th style={{ width: "150px", background: "#f288ff" }}>Name</th>
                <th style={{ width: "200px", background: "#f288ff" }}>Email</th>
                <th style={{ width: "150px", background: "#f288ff" }}>Phone</th>
                <th style={{ width: "100px", background: "#f288ff" }}>Role</th>
                <th style={{ width: "150px", background: "#f288ff" }}>
                  Status
                </th>
                <th
                  className="text-center"
                  style={{ width: "150px", background: "#f288ff" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {employeeData?.length ===0 ? (
              <tr>
                <td colSpan="7" className="text-center">Loading...</td>
              </tr>
              ) : (
              employeeData?.map((employee, idx) => (
                <tr key={employee._id}>
                  <td>{idx + 1}</td>
                  <td>
                    {employee["First Name"]} {employee["Last Name"]}
                  </td>
                  <td className="overflow-auto scrollbar">
                    <Link href={`mailto:${employee["Email"]}`}>
                      {employee["Email"]}
                    </Link>
                  </td>
                  <td>
                    <Link href={`tel:${employee.Phone}`}>{employee.Phone}</Link>
                  </td>
                  <td>{employee.Role}</td>
                  <td>
                    <EmployeeStatusDropdown
                    fetchEmployee={fetchEmployee}
                      employee={employee}
                      idx={idx}
                      handleChangeStatus={handleChangeStatus}
                    />
                  </td>
                  <td className="text-center">
                    <EditButton handleEdit={handleEdit} item={employee} />
                    <DeleteButton
                      handleDelete={handleDelete}
                      id={employee._id}
                    />
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
      </div>


      {/* Edit Employee Modal */}
      {editEmployees && (
        <EditEmployeeFormModal
          id={editEmployees._id}
          editEmployees={editEmployees}
          handleSave={handleSave}
          onClose={() => setEditEmployees(null)}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
