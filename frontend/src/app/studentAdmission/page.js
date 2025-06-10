"use client";
import { useContext, useEffect, useState } from 'react';
import { createStd } from '@/app/api/studentApi';
import toast from 'react-hot-toast';
import { MainAdminContext } from '@/app/context/AdminContext';
import CourseMultipleDropdown from '../components/Dropdown/CourseMultipleDropdown';

export default function DirectAdmission({ }) {
  const { adminState } = useContext(MainAdminContext)

  const [formData, setFormData] = useState({
    "Lead by": "",
    "Demo by": "",
    Name: "",
    Phone: "",
    "Email id": "",
    Course: "",
    Fee: "",
    Remark: "Click to See Remark",
    DOA: new Date().toISOString().split("T")[0],
    DOJ: new Date().toISOString().split("T")[0],
    EmiId: "",
    Password: "",
    leadId: ""
  });

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Capitalize the first letter of the value
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setFormData({
      ...formData,
      [name]: capitalizedValue, // Update with the capitalized value
    });
  };

  const handleCourseSelectionChange = (selectedCourses) => {
    const totalFee = selectedCourses.reduce((sum, course) => sum + (course["Course Fee"] || 0), 0);
    setFormData({
      ...formData,
      Course: selectedCourses.map((course) => course.Abbreviation),
      Fee: totalFee,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let newLead
      newLead = await createStd(adminState, formData);
      console.log(newLead);
      toast.success('"Lead added successfully!"')

      if (newLead) {
        setFormData({
          "Lead by": "",
          "Demo by": "",
          Name: "",
          Phone: "",
          "Email id": "",
          Course: [],
          Fee: 0,
          DOA: "",
          DOJ: "",
          EmiId: "",
          Password: "",
          Remark: "",
        });
      }
      onClose();
      toast.success("Admission Done Successfully.")
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add lead. Please try again.")
    }
  };

  return (
    <div className="container-fluid w-100">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-sm-4 mb-3">
            <label htmlFor="Admission-Name" className="form-label">Name:</label>
            <input
              type="text"
              id="Admission-Name"
              name="Name"
              className="form-control shadow-none"
              value={formData.Name}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Enter your name"
            />
          </div>

          <div className="col-12 col-sm-4 mb-3">
            <label htmlFor="Admission-Phone" className="form-label">Phone:</label>
            <input
              type="text"
              id="Admission-Phone"
              name="Phone"
              className="form-control shadow-none"
              value={formData.Phone}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Enter your phone number"
              maxLength={15}
            />
          </div>

          <div className="col-12 col-sm-4 mb-3">
            <label htmlFor="Admission-EmailId" className="form-label">Email ID:</label>
            <input
              type="email"
              id="Admission-EmailId"
              name="Email id"
              className="form-control shadow-none"
              value={formData["Email id"].toLowerCase()}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Enter your email"
            />
          </div>

          {/* Course Dropdown */}
          <div className="col-12 col-sm-4 mb-3">
            <p className="form-label">Course:</p>
            <div className='border'>
              <CourseMultipleDropdown
                studentCourses={formData.Course}
                onSelectionChange={handleCourseSelectionChange}
              />
            </div>
          </div>



          {/* Fee Field */}
          <div className="col-12 col-sm-4 mb-3">
            <label htmlFor="Admission-Fee" className="form-label">Fee:</label>
            <input
              type="text"
              id="Admission-Fee"
              name="Fee"
              className="form-control shadow-none"
              value={formData.Fee || ""} // Ensures controlled component
              onChange={(e) => {
                const updatedFee = e.target.value;
                setFormData((prevData) => ({ ...prevData, Fee: updatedFee })); // Update local state
                updateLeadData(lead._id, { Fee: updatedFee }); // Update backend
              }}
              placeholder="Total Fee"
            />
          </div>

          {/* DOJ Field */}
          <div className="col-12 col-sm-4 mb-3">
            <label htmlFor="DOJ" className="form-label">Date of Joining:</label>
            <input
              type="date"
              id="DOJ"
              name="DOJ"
              className="form-control shadow-none"
              value={formData.DOJ || new Date().toISOString().split("T")[0]} // Default to today's date if DOJ is not set
              onChange={(e) => {
                const selectedDate = e.target.value; // Directly use the input value
                setFormData((prevData) => ({ ...prevData, DOJ: selectedDate })); // Update local state
                updateLeadData(lead._id, { DOJ: selectedDate }); // Update the backend
              }}
              required
            />
          </div>





          <div className="col-12 col-sm-4 mb-3">
            <label htmlFor="Admission-leadBy" className="form-label">Lead By:</label>
            <input
              type="text"
              id="Admission-leadBy"
              name="Lead by"
              className="form-control shadow-none"
              value={formData["Lead by"]}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Enter lead source"
            />
          </div>

          {/* Demo by Field */}
          <div className="col-12 col-sm-4 mb-3">
            <label htmlFor="Admission-demoBy" className="form-label">Demo By:</label>
            <input
              type="text"
              id="Admission-demoBy"
              name="Demo by"
              className="form-control shadow-none"
              value={formData["Demo by"]}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter Demo Giver"
            />
          </div>

          {/* EMI Field */}
          <div className="col-12 col-sm-4 mb-3">
            <label htmlFor="Admission-EMI" className="form-label">EMI:</label>
            <input
              type="text"
              id="Admission-EMI"
              name="EMI"
              className="form-control shadow-none"
              value={formData.EMI}
              onChange={handleChange}
              placeholder="Shown EMI"
            />
          </div>

          {/* Password Field */}
          <div className="col-12 col-sm-4 mb-3">
            <label htmlFor="Admission-Password" className="form-label">Password:</label>
            <input
              type="text"
              id="Admission-Password"
              name="Password"
              className="form-control shadow-none text-success border border-success"
              value={`${formData?.["Name"].toUpperCase().substring(0, 4)}${formData?.["Phone"].slice(-4)}`}
              onChange={handleChange}
              readOnly
              placeholder="Enter a password"
            />
          </div>

        </div>

        <div className="col-6 col-sm-6 mb-3">
          <button type="submit" className="btn btn-success w-100">Register</button>
        </div>
      </form>
    </div>
  );
}