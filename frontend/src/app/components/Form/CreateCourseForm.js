"use client";
import React, { useContext, useState, useEffect } from 'react';
import { createCourse } from '@/app/api/courseApi';
import toast from 'react-hot-toast';
import { UserContext } from '@/app/context/UserContext';
import { MainAdminContext } from '@/app/context/AdminContext';
// import EmployeeDropdown from '../Dropdown/EmployeeDropdown';

export default function CreateCourseForm() {
  const { state } = useContext(UserContext);
  const { adminState } = useContext(MainAdminContext);
  const [formData, setFormData] = useState({
    "Course Name": "",
    "Abbreviation": "",
    "Duration": "",
    "Course Fee": "",
    "DurationType": "Days", // Default DurationType as "Days"
    // "Trainers": [] // Initially empty trainer array
  });

  // Handle input changes
  const handleChange = (field, value) => {
    if (field === "Abbreviation") {
      value = value.toUpperCase(); // Ensure abbreviation is in uppercase
    }

    // Capitalize the first letter for other fields
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

    setFormData((prevData) => ({
      ...prevData,
      [field]: capitalizedValue
    }));
  };

  // Calculate the Duration value based on selected DurationType
  const calculateDuration = () => {
    const { Duration, DurationType } = formData;
    if (Duration && DurationType) {
      let calculatedDuration = 0;
      if (DurationType === "Days") {
        calculatedDuration = Duration / 1;
      } else if (DurationType === "Months") {
        calculatedDuration = Duration / 28; // Approximate number of days in a month
      } else if (DurationType === "Years") {
        calculatedDuration = Duration / 365; // Approximate number of days in a year
      }

      setFormData((prevData) => ({
        ...prevData,
        Duration: calculatedDuration
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("before Save data",formData);

    // Validation and API call could go here
    // Example:
    if (!formData["Course Name"] || !formData["Abbreviation"] || !formData["Duration"]) {
      toast.error("Please fill in all fields");
      return;
    }

       // Calculate the duration based on selected DurationType
       let calculatedDuration = formData.Duration;
       if (formData.Duration && formData.DurationType) {
         if (formData.DurationType === "Days") {
           calculatedDuration = formData.Duration * 1;
         } else if (formData.DurationType === "Months") {
           calculatedDuration = formData.Duration * 28; // Approximate number of days in a month
         } else if (formData.DurationType === "Years") {
           calculatedDuration = formData.Duration * 365; // Approximate number of days in a year
         }
       }
   
       // Create an updated object with the calculated duration
       const updatedCourseData = {
         ...formData,
         Duration: calculatedDuration // Overwrite the Duration with the calculated one
       }; 

       console.log(updatedCourseData);
       
    let newCourse;
    if (!adminState.token) {
      newCourse = await createCourse(state, updatedCourseData);
    } else {
      newCourse = await createCourse(adminState, updatedCourseData);
    }
    if (newCourse) {
      toast.success("Course added successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  // Use Effect to trigger calculateDuration when Duration or DurationType changes
  useEffect(() => {
    if (formData["Duration"] && formData["DurationType"]) {
      calculateDuration();
    }
  }, [formData["DurationType"]]);

  return (
    <form id="edit-course-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="CourseName" className="form-label">Course Name</label>
        <input
          type="text"
          id='CourseName'
          className="form-control shadow-none"
          placeholder='Enter Full Course'
          value={formData["Course Name"]}
          onChange={(e) => handleChange("Course Name", e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Abbreviation" className="form-label">Abbreviation</label>
        <input
          type="text"
          id='Abbreviation'
          className="form-control shadow-none"
          placeholder='Use KeyWord in UpperCase'
          value={formData["Abbreviation"].toUpperCase()}
          onChange={(e) => handleChange("Abbreviation", e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="CourseFee" className="form-label">Course Fee</label>
        <input
          type="text"
          id='CourseFee'
          className="form-control shadow-none"
          placeholder='Course Fee'
          value={formData["Course Fee"]}
          onChange={(e) => handleChange("Course Fee", e.target.value)}
        />
      </div>

        {/* Pass onSelectionChange to update the Trainer field */}
      {/* <div className="mb-3">
        <EmployeeDropdown onSelectionChange={handleTrainerSelectionChange} />
      </div> */}

      <div className="row mb-3">
        <div className='col-6'>
          <label htmlFor="DurationType" className="form-label">Duration Type</label>
          <select
            id='DurationType'
            className='form-control'
            value={formData.DurationType}
            onChange={(e) => {
              const selectedDurationType = e.target.value;
              setFormData((prevData) => ({
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
            type="number"
            id='Duration'
            className="form-control shadow-none"
            placeholder='Duration in Number'
            value={formData["Duration"]}
            onChange={(e) => handleChange("Duration", e.target.value)}
          />
        </div>
      </div>

      <div className='text-end'>
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </div>
    </form>
  );
}
