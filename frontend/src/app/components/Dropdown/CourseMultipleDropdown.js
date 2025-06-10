"use client"
import React, { useState, useEffect, useContext } from "react";
import { CourseContext } from "@/app/context/CourseContext";
import { UserContext } from "@/app/context/UserContext";
import { getAllCourse } from "@/app/api/courseApi";
import Loader from "../common/Loader";

function CourseMultipleDropdown({ indexId, studentCourses = [], onSelectionChange, disable }) {
  const { state } = useContext(UserContext);
  const { courseData, courseDispatch } = useContext(CourseContext);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    let data;
    try {
      setIsLoading(true);
      // Fetch course data based on the user's state
      data = await getAllCourse(state);
      if (data) {
        courseDispatch({ type: "GET_COURSE", payload: data });
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    fetchCourses();
  }, []);

  useEffect(() => {
    
    if (studentCourses.length > 0 && courseData?.length > 0) {
      // Find the courses that match the studentCourses by Abbreviation
      const preSelected = courseData
        .filter((course) => studentCourses.includes(course._id)) // Use _id
        .map((course) => course._id);
      setSelected(preSelected);
    }
  }, [courseData, studentCourses]);

  const handleCheckboxChange = (courseId) => {
    const updatedSelected = selected.includes(courseId)
      ? selected.filter((id) => id !== courseId)
      : [...selected, courseId];
    setSelected(updatedSelected);

    // Pass only selected courses' _id to the parent (for backend)
    const selectedCourses = courseData
      .filter((course) => updatedSelected.includes(course._id))
      .map((course) => course); // Send full course object for abbreviation
    onSelectionChange?.(selectedCourses); // Send course objects to parent
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
            <Loader/>
          ) : (
            courseData?.map((course) => (
              <div key={course._id} className="dropdown-item" title={course["Course Name"]}>
                <div className="form-check position-relative">
                  <input
                    type="checkbox"
                    id={`checkbox-${course._id}-${indexId}`}
                    name={`checkbox-${course._id}-${indexId}`}
                    className="form-check-input shadow-none"
                    value={course._id}
                    style={{ cursor: "pointer" }}
                    checked={selected.includes(course._id)} // Check if _id is in the selected array
                    onChange={() => handleCheckboxChange(course._id)} // Pass _id on change
                    autoComplete="off"
                  />
                  <label
                    htmlFor={`checkbox-${course._id}-${indexId}`}
                    className="form-check-label d-flex justify-content-between"
                    style={{ cursor: "pointer" }}
                  >
                    <span>{course["Abbreviation"]}</span> <span>{
                      course.DurationType === "Months" ? (course.Duration / 28) + " Months" :
                      course.DurationType === "Days" ? (course.Duration / 1) + " Days" :
                      course.DurationType === "Years" ? (course.Duration / 365) + " Years" :
                      (course.Duration) + " Days"
                    }</span>
                  </label>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <input
        type="text"
        id={`CourseInput-${indexId}`}
        name={`CourseInput-${indexId}`}
        className="form-control shadow-none bg-transparent border-0 rounded-0"
        placeholder={isLoading ? "Loading courses..." : "Select Courses"}
        value={selected
          .map((id) => courseData?.find((course) => course._id === id)?.Abbreviation)
          .filter(Boolean)
          .join("  |  ")} // Display the Abbreviations of selected courses
        readOnly
      />
    </div>
  );
}

export default CourseMultipleDropdown;
