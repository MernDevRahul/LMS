"use client";
import { createEmp } from "@/app/api/employeeApi"; // API function to create employee
import { useContext, useState } from "react"; // React's useState hook
import RoleDropdown from "../Dropdown/RoleDropdown";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";
import { MainAdminContext } from "@/app/context/AdminContext";

export default function CreateEmployeeForm({onClose,fetchEmployee}) {
  // State to hold the form data
  const {state} = useContext(UserContext)
  const {adminState} = useContext(MainAdminContext)
  const router = useRouter();
  const [formData, setFormData] = useState({
    "First Name": "",
    "Last Name": "",
    "Email": "",
    Password: "Techstack@2025",
    Phone: "+91",
    Role: "",
    Status: "active",
  });

// // Handle changes in form fields
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



  // Handle form submission
  const handleSubmit = async () => {
    console.log(formData);

    // Validate required fields
    if (
      !formData["First Name"] ||
      !formData["Last Name"] ||
      !formData["Email"] ||
      !formData.Role ||
      !formData.Status ||
      !formData.Password
    ) {
      toast.error("Please fill all the fields.");
      return;
    }

    // Show a loading toast
    const toastId = toast.loading("Adding employee...");

    try {
        let data
      if(!adminState.token)
       data = await createEmp(state,formData); // API call to create employee
      else
      data = await createEmp(adminState,formData)

      if (data) {
        toast.success("Employee added successfully!", { id: toastId });

        onClose()
        fetchEmployee()
        // Optional: Clear the form after successful submission
        setFormData({
          "First Name": "",
          "Last Name": "",
          "Email": "",
          Password: "Techstack@2025",
          Phone: "+91",
          Role: "",
          Status: "active",
          "Lead by": "",
        });

      } else {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add employee. Try again.", { id: toastId });
    }finally{
      onClose();
    }
  };

  return (
    <div className="container-fluid">
      <form>
        <div className="row">
          {/* First Name input field */}
          <div className="col-12 col-sm-6 mb-3">
            <label htmlFor="firstName" className="form-label">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="First Name"
              className="form-control shadow-none"
              value={formData["First Name"]}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter First name"
              required
            />
          </div>

          {/* Last Name input field */}
          <div className="col-12 col-sm-6 mb-3">
            <label htmlFor="lastName" className="form-label">Last Name:</label>
            <input
              type="text"
              id="lastName"
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
            <label htmlFor="emailId" className="form-label">Email ID:</label>
            <input
              type="email"
              id="emailId"
              name="Email"
              className="form-control shadow-none"
              value={formData["Email"].toLowerCase()}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Enter your Email"  
            />
          </div>

          {/* Phone input field */}
          <div className="col-12 col-sm-6 mb-3">
            <label htmlFor="phone" className="form-label">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="Phone"
              className="form-control shadow-none"
              value={formData.Phone}
              onChange={handleChange}
              required
              autoComplete="off"
              maxLength={18}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password input field */}
          <div className="col-12 col-sm-6 mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="text"
              id="password"
              name="Password"
              className="form-control shadow-none text-success fw-bold border-success"
              value={formData.Password}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Enter your password"
            />
          </div>

          {/* RoleDropdown component */}
          <RoleDropdown formData={formData.Role} handleChange={handleChange} />

          {/* Submit button */}
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
