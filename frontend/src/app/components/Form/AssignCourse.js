import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { CoursesAssign } from '@/app/api/coursesAssignAPI';
import TrainerDropdown from '../Dropdown/TrainerSelectDropdown';
import CourseMultipleDropdown from '../Dropdown/CourseMultipleDropdown';


export const AssignCourse = () => {

    const [coursesAssign, setCoursesAssign] = useState({
        "course_abbriviation" :"",
        "trainerid":""
    })


  function handleSelection(selectedCourses){
    setCoursesAssign((prev)=>({
        
        ...prev,
         "course_abbriviation" :selectedCourses.map((course)=> course.Abbreviation)
    }))    
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(coursesAssign["trainerid"] || coursesAssign["course_abbriviation"] ){

            let data = await CoursesAssign(coursesAssign)
            if(data){
                toast.success("Course assigned successfully!")
            }
        
      
    }else{
        toast.error("All fields are required!")
    }

  }
  
    return (
        <form id="edit-course-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="CourseName" className="form-label">Email ID </label>
            <TrainerDropdown onTrainerSelect={(email) =>setCoursesAssign(prev => ({ ...prev, trainerid: email }))} />
          </div>
          <div className="mb-3">
            <label htmlFor="Abbreviation" className="form-label">Courses</label>
            
            <CourseMultipleDropdown studentCourse s={coursesAssign["course_abbriviation"]}
            onSelectionChange={handleSelection}
            />
          </div>
         
          <div className='text-end'>
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
        </form>
      );
}
