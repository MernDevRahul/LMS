"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditCourseFormModal({ id, editCourse, handleSave, onClose }) {
  // State to store course data as an object
  const [courseData, setCourseData] = useState({
    "Course Name": editCourse?.["Course Name"] || "",
    Abbreviation: editCourse?.Abbreviation || "",
    Duration: editCourse?.Duration || "",
    "Course Fee": editCourse?.["Course Fee"] ?? "", // Change default value to empty string
    "DurationType": editCourse?.["DurationType"] ?? "", // Default DurationType as "Days"
  });

  // Update course data when editCourse prop changes
  useEffect(() => {
    setCourseData({
      "Course Name": editCourse?.["Course Name"] || "",
      Abbreviation: editCourse?.Abbreviation || "",
      Duration: editCourse?.Duration || "",
      "Course Fee": editCourse?.["Course Fee"] ?? "", // Change default value to empty string
      "DurationType": editCourse?.["DurationType"] ?? "", // Default DurationType as "Days"
    });
  }, [editCourse]);

  // Function to handle numeric input change
  const handleNumberChange = (field, value) => {
    const numericValue = value === "" ? "" : parseFloat(value); // Allow empty string input
    if (value === "" || (!isNaN(numericValue) && numericValue >= 0)) {
      setCourseData((prevData) => ({
        ...prevData,
        [field]: numericValue
      }));
    }
  };

  // Handle field changes
  const handleChange = (field, value) => {
    setCourseData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  // Calculate the Duration value based on selected DurationType
  const calculateDuration = () => {
    const { Duration, DurationType } = courseData;
    if (Duration && DurationType) {
      let calculatedDuration = 0;
      if (DurationType === "Days") {
        calculatedDuration = Duration / 1;
      } else if (DurationType === "Months") {
        calculatedDuration = Duration / 28; // Approximate number of days in a month
      } else if (DurationType === "Years") {
        calculatedDuration = Duration / 365; // Approximate number of days in a year
      }

      setCourseData((prevData) => ({
        ...prevData,
        Duration: calculatedDuration
      }));
    }
  };

  // Handle save and send data to parent
  const handleSaveClick = () => {
    // Validate inputs
    if (!courseData["Course Name"] || !courseData.Abbreviation || !courseData.Duration) {
      toast.error('Please fill out all fields before saving.')
      return;
    }
    if (courseData["Course Fee"] === "" || isNaN(courseData["Course Fee"]) || courseData["Course Fee"] < 0) {
      toast.error('Please enter a valid fee.')
      return;
    }

    // Calculate the duration based on selected DurationType
    let calculatedDuration = courseData.Duration;
    if (courseData.Duration && courseData.DurationType) {
      if (courseData.DurationType === "Days") {
        calculatedDuration = courseData.Duration * 1;
      } else if (courseData.DurationType === "Months") {
        calculatedDuration = courseData.Duration * 28; // Approximate number of days in a month
      } else if (courseData.DurationType === "Years") {
        calculatedDuration = courseData.Duration * 365; // Approximate number of days in a year
      }
    }

    // Create an updated object with the calculated duration
    const updatedCourseData = {
      ...courseData,
      Duration: calculatedDuration // Overwrite the Duration with the calculated one
    };

    // Send the updated data back to the parent component
    handleSave(id, updatedCourseData); // This ensures the parent updates the course
  };

  // Use Effect to trigger calculateDuration when Duration or DurationType changes
  useEffect(() => {
    if (courseData["Duration"] && courseData["DurationType"]) {
      calculateDuration();
    }
  }, [courseData["DurationType"]]);


  if (!editCourse) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: "#00000090" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Course</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="courseName" className="form-label">Course Name</label>
              <input
                id="courseName"
                type="text"
                className="form-control"
                value={courseData["Course Name"]}
                onChange={(e) => handleChange("Course Name", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="abbreviation" className="form-label">Abbreviation</label>
              <input
                id="abbreviation"
                type="text"
                className="form-control"
                value={courseData.Abbreviation}
                onChange={(e) => handleChange("Abbreviation", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="CourseFee" className="form-label">Course Fee</label>
              <input
                id="CourseFee"
                type="number"  // Changed to number for numeric input
                className="form-control"
                value={courseData["Course Fee"]}
                onChange={(e) => handleNumberChange("Course Fee", e.target.value)}  // Use the new function here
              />
            </div>


            <div className="row mb-3">

              <div className='col-6'>
                <label htmlFor="DurationType" className="form-label">Duration Type</label>
                <select
                  id='DurationType'
                  className='form-control'
                  value={courseData.DurationType}
                  onChange={(e) => {
                    const selectedDurationType = e.target.value;
                    setCourseData((prevData) => ({
                      ...prevData,
                      DurationType: selectedDurationType
                    }));
                  }}
                >
                  <option value="Days">Days</option>
                  <option value="Months">Months</option>
                  <option value="Years">Years</option>
                </select>
              </div>

              <div className='col-6'>
                <label htmlFor="Duration" className="form-label">Duration in Number</label>
                <input
                  type="text"
                  id='Duration'
                  className="form-control shadow-none"
                  placeholder='Duration in Number'
                  value={courseData["Duration"]}
                  onChange={(e) => handleChange("Duration", e.target.value)}
                />
              </div>
            </div>

          </div>



          <div className="modal-footer">
            <button type="button" className="btn btn-success" onClick={handleSaveClick}>
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
