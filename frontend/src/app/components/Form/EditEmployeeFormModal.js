"use client";
import React, { useState, useEffect } from "react";
import RoleDropdown from "../Dropdown/RoleDropdown";
import toast from "react-hot-toast";

export default function EditEmployeeFormModal({ id, editEmployees, handleSave, onClose }) {
  const [formData, setFormData] = useState({
    "First Name": editEmployees?.["First Name"] || "",
    "Last Name": editEmployees?.["Last Name"] || "",
    "Email": editEmployees?.["Email"] || "",
    Password: editEmployees?.Password || "",
    Phone: editEmployees?.Phone || "",
    Role: editEmployees?.Role || "",
  });

  // Update formData when editEmployees prop changes
  useEffect(() => {    
    setFormData({
      "First Name": editEmployees?.["First Name"] || "",
      "Last Name": editEmployees?.["Last Name"] || "",
      "Email": editEmployees?.["Email"] || "",
      // Password: editEmployees?.Password || "",
      Phone: editEmployees?.Phone || "",
      Role: editEmployees?.Role || "",
    });
  }, [editEmployees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let updatedValue = value;
  
    // Capitalize the first letter for "First Name" and "Last Name"
    if (name === "First Name" || name === "Last Name") {
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
    
    // Convert the email to lowercase
    if (name === "Email") {
      updatedValue = value.toLowerCase();
    }
  
    setFormData({
      ...formData,
      [name]: updatedValue, // Update with the appropriate capitalized or lowercased value
    });
  };
  

  // Validate and save the data
  const handleSaveClick = () => {
    if (
      !formData["First Name"] ||
      !formData["Last Name"] ||
      !formData["Email"] ||
      !formData.Phone ||
      !formData.Role
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }
  
    // Show a loading toast before saving
    const toastId = toast.loading("Saving changes...");
  
    try {
      handleSave(id, formData);
      
      // Show success toast after saving
      toast.success("Employee details updated successfully!", { id: toastId });
    onClose();
    } catch (error) {
      // Show error toast if saving fails
      toast.error("Failed to update employee details. Please try again.", { id: toastId });
    }
  };
  
  if (!editEmployees) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ background: "#00000090" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Employee</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {/* First Name input field */}
              <div className="col-12 col-sm-6 mb-3">
                <label htmlFor="First Name" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  id="First Name"
                  name="First Name"
                  className="form-control shadow-none"
                  value={formData["First Name"]}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Enter First name"
                />
              </div>

              {/* Last Name input field */}
              <div className="col-12 col-sm-6 mb-3">
                <label htmlFor="Last Name" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="Last Name"
                  name="Last Name"
                  className="form-control shadow-none"
                  value={formData["Last Name"]}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Enter Last name"
                />
              </div>

              {/* Email input field */}
              <div className="col-12 col-sm-6 mb-3">
                <label htmlFor="emailId" className="form-label">
                  Email:
                </label> 
                <input
                  type="email"
                  id="emailId"
                  name="Email"
                  className="form-control shadow-none"
                  value={formData["Email"].toLowerCase()}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Enter employee email"
                />
              </div>

              {/* Phone input field */}
              <div className="col-12 col-sm-6 mb-3">
                <label htmlFor="Phone" className="form-label">
                  Phone:
                </label>
                <input
                  type="tel"
                  id="Phone"
                  name="Phone"
                  className="form-control shadow-none"
                  value={formData.Phone}
                  onChange={handleChange}
                  required
                  maxLength={18}
                  autoComplete="off"
                  placeholder="Enter employee phone"
                />
              </div>

              {/* RoleDropdown component */}
              <div style={{color:'black'}}>
              <RoleDropdown formData={formData.Role} handleChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSaveClick}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
