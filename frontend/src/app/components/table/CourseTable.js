"use client";
import React, { useState, useContext } from "react";
import EditCourseFormModal from "../Form/EditCourseFormModal";
import EditButton from "../Button/EditButton";
import DeleteButton from "../Button/DeleteButton";
import { deleteCourse, updateCourse } from "@/app/api/courseApi";
import toast from "react-hot-toast";
import { MainAdminContext } from "@/app/context/AdminContext";
import { CourseContext } from "@/app/context/CourseContext";

export default function CourseTable({fetchCourses}) {
  const {adminState} = useContext(MainAdminContext)
  const [editCourse, setEditCourse] = useState(null);
  const {courseData} = useContext(CourseContext)
  const handleEdit = (course) => {
    setEditCourse(course); // Set the course to edit
  };

  const handleSave = async (id, updatedCourse) => {
    try {
      // Re-fetch the courses to ensure we have the latest data
        let data =await updateCourse(adminState,id, updatedCourse);
        if(data){
          fetchCourses();
        }
      
      setEditCourse(null); // Close the modal after saving
      console.log("Course updated successfully!");
    } catch (error) {
      console.error("Error saving updated course:", error);
      // alert("");
      toast.error('Failed to save the course. Please try again.')
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Do you want to delete this course?");
    if (confirmDelete) {
      try{ 
          const status = await deleteCourse(adminState,id)
          if(status==200){
              fetchCourses()
          }
      } 
      catch (error) {
        console.error("Error deleting course:", error);
        toast.error('Failed to delete the course. Please try again.')
      }
    }
  };  

  return (
  <>
  {

      <div className="border-top">
      <div className="table-responsive" style={{ overflowX: "auto" }}>
        <table className="table table-hover" style={{ tableLayout: "fixed", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ background: "#aeffae" }}>Sr</th>
              <th style={{ width: "300px", background: "#aeffae" }}>Course Name</th>
              <th style={{ width: "150px", background: "#aeffae" }}>Abbreviation</th>
              <th style={{ width: "200px", background: "#aeffae" }}>Course Fee</th>
              <th style={{ width: "200px", background: "#aeffae" }}>Duration</th>
              <th style={{ width: "200px", background: "#aeffae" }} className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {courseData?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">Loading...</td>
              </tr>
            ) : (
              courseData?.map((item, idx) => (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td>{item["Course Name"]}</td>
                  <td>{item.Abbreviation}</td>
                  <td>{item["Course Fee"]}</td>
                  <td>{
                    item.DurationType==="Years"?
                    (item.Duration/365) +" "+ item.DurationType
                    :
                    item.DurationType==="Months"?
                    (item.Duration/28) +" "+ item.DurationType
                    :
                    item.DurationType==="Days"?
                    (item.Duration/1) +" "+ item.DurationType
                    :
                    (item.Duration) +" "+ item.DurationType
                    }
                    </td>
                  <td className="text-center">
                    <EditButton handleEdit={handleEdit} item={item} />
                    <DeleteButton handleDelete={handleDelete} id={item._id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Course Modal */}
      {editCourse && (
        <EditCourseFormModal
          id={editCourse._id}       // Passing id (optional, not strictly needed here)
          editCourse={editCourse}
          handleSave={handleSave}
          onClose={() => setEditCourse(null)}
        />
      )}

    </div>
  }
  </>
  );
}
