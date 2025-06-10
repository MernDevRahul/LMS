"use client";
import React, { useState, useEffect, useContext } from "react";

import { MainAdminContext } from "@/app/context/AdminContext";
import { UserContext } from "@/app/context/UserContext";
import { CourseContext } from "@/app/context/CourseContext";

import Loader from "../common/Loader"; // Assuming you have a loader component
import { getAllBatchforSearch } from "@/app/api/batchApi";

function BatchMultipleDropdown({ indexId, studentCourses, studentBatches = [], onSelectionChange, disable }) {
  const { adminState } = useContext(MainAdminContext);
  const { state } = useContext(UserContext);
  const { courseData } = useContext(CourseContext)
  const [selected, setSelected] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(courseData);
  // console.log(studentCourses);


  const fetchBatches = async () => {
    let data;
    try {
      setIsLoading(true);
      // Fetch batch data based on adminState
      data = !adminState.token ? await getAllBatchforSearch(adminState) : await getAllBatchforSearch(state);
      if (data) {
        // console.log("All batches",data);
        setBatchData(data);
      }
    } catch (error) {
      console.error("Failed to fetch batches", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {

    fetchBatches();
  }, []);

  useEffect(() => {
    if (studentBatches.length > 0 && batchData?.length > 0) {
      // Find the courses that match the studentBatches by Abbreviation
      const preSelected = batchData
        .filter((batch) => studentBatches.includes(batch._id)) // Use _id
        .map((batch) => batch._id);
      setSelected(preSelected);
    }
  }, [batchData, studentBatches]);

  const handleCheckboxChange = (batchId) => {
    const updatedSelected = selected.includes(batchId)
      ? selected.filter((id) => id !== batchId)
      : [...selected, batchId];
    setSelected(updatedSelected);

    // Pass selected batches to parent (you could pass the full batch object as needed)
    const selectedBatches = batchData
      .filter((batch) => updatedSelected.includes(batch._id))
      .map((batch) => batch); // Send full batch object
    onSelectionChange?.(selectedBatches); // Send selected batch objects to parent
  };

  return (
    <div className="input-group m-0 p-0">
      <div className="input-group-append">
        <button
          className="btn btn-dark dropdown-toggle border-0"
          type="button"
          id={`dropdownMenuButton-${indexId}`}
          disabled={disable || isLoading}
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{ borderRadius: "0", border: "1px solid #dee2e6" }}
        ></button>

        <div
          className="dropdown-menu w-100 scroll-thumb"
          aria-labelledby={`dropdownMenuButton-${indexId}`}
          style={{
            transform: "translate(0px,40px)",
            height: "185px",
            overflowY: "scroll",
            overflowX: "hidden",
            padding: "0 0px",
          }}
        >

          {isLoading ? (
            <Loader />
          ) : (
            batchData?.filter((batch) => studentCourses.some(course => course === batch.courseId)) // Filter batches based on course._id
              .map((batch) => (
                <div key={batch._id} className="dropdown-item" title={`${batch.timings} (${batch.batchType})`}>
                  <div className="form-check position-relative">
                    <input
                      type="checkbox"
                      id={`checkbox-${batch._id}-${indexId}`}
                      name={`checkbox-${batch._id}-${indexId}`}
                      className="form-check-input shadow-none"
                      value={batch._id}
                      style={{ cursor: "pointer" }}
                      checked={selected.includes(batch._id)} // Check if _id is in the selected array
                      onChange={() => handleCheckboxChange(batch._id)} // Pass _id on change
                      autoComplete="off"
                    />
                    <label
                      htmlFor={`checkbox-${batch._id}-${indexId}`}
                      className="form-check-label d-flex justify-content-between"
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        {courseData.map((course) => {
                          if (course._id === batch.courseId) {
                            return `${course.Abbreviation} (${batch.timings} ${batch.batchType})`;
                          }
                        })}
                      </span>
                    </label>
                  </div>
                </div>
              ))
          )}


        </div>
      </div>


      <input
        type="text"
        id={`BatchInput-${indexId}`}
        name={`BatchInput-${indexId}`}
        className="form-control shadow-none bg-transparent border-0 rounded-0"
        placeholder={isLoading ? "Loading batches..." : "Select Batches"}
        value={selected
          .map((id) => {
            const batch = batchData?.find((batch) => batch._id === id);
            if (batch) {
              // Find the course related to the batch
              const course = courseData.find((course) => course._id === batch.courseId);
              if (course) {
                // Combine course abbreviation, batch timings, and batch type
                return `${course.Abbreviation} (${batch.timings} ${batch.batchType})`;
              }
            }
            return null; // Ensure undefined or null is avoided in the array
          })
          .filter(Boolean) // Filter out null or undefined values
          .join("  |  ")} // Join the selected values with a separator
        readOnly
      />


    </div>
  );
}

export default BatchMultipleDropdown;
