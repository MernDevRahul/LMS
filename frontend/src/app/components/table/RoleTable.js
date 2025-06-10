"use client";
import React, { useContext, useEffect, useState } from "react";

import { createRole, getAllRole, updateRole, deleteRole, } from "@/app/api/roleApi";
import { getAllEmp } from "@/app/api/employeeApi";

import EditButton from "../Button/EditButton";
import DeleteButton from "../Button/DeleteButton";

import { EmployeeContext } from "@/app/context/EmployeeContext";
import { MainAdminContext } from "@/app/context/AdminContext";
import { UserContext } from "@/app/context/UserContext";
import { RoleContext } from "@/app/context/RoleContext";
import toast from "react-hot-toast";

export default function RoleTable() {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const { state } = useContext(UserContext);
  const { adminState } = useContext(MainAdminContext);

  const [roleType, setRoleType] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [editingRole, setEditingRole] = useState(null); // State to track the role being edited
  const { roleData, dispatch } = useContext(RoleContext);
  const { employeeData, employeeDispatch } = useContext(EmployeeContext);

  async function fetchRole() {
    try {
      const data = await getAllRole();
      if (data) {
        if (adminState?.Role === "ADMIN") {
          dispatch({
            type: "GET_ROLE",
            payload: data,
          });
        } else {
          const filteredRoles = data.filter(
            (role) => role.Abbreviation !== "ADMIN"
          );
          dispatch({
            type: "GET_ROLE",
            payload: filteredRoles,
          });
        }
      }
    } catch (error) {
      toast.error("Error fetching roles.");
      console.error("Error fetching roles:", error);
    } finally {
    }
  }

  async function fetchEmployees() {
    let data;
    try {
      if (!adminState.token) {
        data = await getAllEmp(state);
        if (data) {
          dispatch({
            type: "GET_EMPLOYEE",
            payload: data,
          });
        }
      } else {
        data = await getAllEmp(adminState);
        if (data) {
          employeeDispatch({
            type: "GET_EMPLOYEE",
            payload: data,
          });
        }
      }
    } catch (error) {
      toast.error("Error fetching roles.");
      console.error("Error fetching roles:", error);
    } finally {
    }
  }
  // Handle Delete button click
  const handleDelete = async (id) => {
    let status;
    const confirmed = window.confirm(
      "Are you sure you want to delete this role?"
    );
    if (confirmed) {
      try {
        if (!adminState.token)
          status = await deleteRole(state, id); // Call the delete API
        else status = await deleteRole(adminState, id); // Call the delete API

        if (status == 200) {
          fetchRole();
        }

      } catch (error) {
        console.error("Error deleting role:", error);
      }
    }
  };

  const handleAddNewRole = () => {
    setIsFormVisible(!isFormVisible);
    setEditingRole(null); // Clear editing state when toggling form visibility
  };

  // Count occurrences of each abbreviation in employees based on their role
  const roleCounts = employeeData.reduce((acc, emp) => {
    if (emp.Role) {
      // Ensure Role exists
      acc[emp.Role] = (acc[emp.Role] || 0) + 1; // Count each role
    }
    return acc;
  }, {});

  useEffect(() => {
    fetchRole();
    fetchEmployees();
    handleAddNewRole();
  }, []);

  // Handle form submission (either create or update role)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const roleData = { Position: roleType, Abbreviation: abbreviation };
    let status;
    try {
      if (roleType && abbreviation) {
        if (editingRole) {
          // update role
          if (!adminState.token)
            status = await updateRole(state, editingRole._id, roleData);
          else status = await updateRole(adminState, editingRole._id, roleData);

          //   const updatedRoles = await getAllRole(state); // Fetch updated roles
          if (status == 200) {
            fetchRole();
            toast.success("Role updated successfully");
            // setRoles(updatedRoles);
            setIsFormVisible(false);
          }
        } else {
          // create Role
          if (!adminState.token) status = await createRole(state, roleData);
          else status = await createRole(adminState, roleData);
          if (status == 200) {
            // const updatedRoles = await getAllRole(state); // Fetch updated roles
            // setRoles(updatedRoles);
            fetchRole();
            toast.success("Role added successfully");
            setIsFormVisible(false);
          }
        }
      } else {
        toast.error("Please fill all the fields");
      }
      setRoleType("");
      setAbbreviation("");
      setIsFormVisible(false);
      setEditingRole(null);
      console.log("Hello");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Edit button click
  const handleEdit = (role) => {
    setRoleType(role.Position); // Set the form fields to the role's data
    setAbbreviation(role.Abbreviation);
    setEditingRole(role); // Set the role being edited
    setIsFormVisible(true); // Show the form to edit the role
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <b></b>
        <button className="btn btn-primary" onClick={handleAddNewRole}>
          {isFormVisible ? "Hide Form" : "Add New Role"}
        </button>
      </div>
      <div className="row">
        {/* First column: always visible */}
        <div
          className={`col-lg-${isFormVisible ? "8" : "12"
            } order-lg-1 order-2 mt-lg-0 mt-4`}
        >
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" style={{ width: "200px" }}>
                  Sr
                </th>
                <th scope="col" style={{ width: "200px" }}>
                  Role Type
                </th>
                <th scope="col" style={{ width: "100px" }}>
                  Abbr
                </th>
                <th scope="col" style={{ width: "50px" }}>
                  Total
                </th>
                <th scope="col" style={{ width: "100px" }}></th>
              </tr>
            </thead>
            <tbody>
              {roleData?.length > 0 ? (
                roleData?.map((role, index) => (
                  <tr key={role.id || index}>
                    <td scope="row">{index + 1}</td>
                    <td>{role.Position}</td>
                    <td>{role.Abbreviation}</td>
                    <td>{roleCounts[role.Abbreviation] || 0}</td>
                    <td>
                      <EditButton handleEdit={() => handleEdit(role)} />
                      <DeleteButton
                        handleDelete={() => handleDelete(role._id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No roles available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Second column: conditionally rendered */}
        {isFormVisible && (
          <div
            className={`col-lg-4 order-lg-2 order-1 border-start d-flex justify-content-center align-items-center`}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="RoleType">Role Type</label>
                <input
                  type="text"
                  className="form-control shadow-none"
                  id="RoleType"
                  placeholder="Enter Role"
                  value={roleType}
                  onChange={(e) => setRoleType(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Abbrevation">Abbreviation</label>
                <input
                  type="text"
                  className="form-control shadow-none"
                  id="Abbrevation"
                  placeholder="Abbreviation"
                  value={abbreviation}
                  onChange={(e) => setAbbreviation(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-right py-2">
                <button
                  type="submit"
                  className="btn btn-outline-primary w-100"
                >
                  {editingRole ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
