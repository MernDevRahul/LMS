"use client"
import { getAllCourse } from '@/app/api/courseApi';
import ModalButton from '@/app/components/Button/CustomModalBtn';
import Loader from '@/app/components/common/Loader';
import CreateCourseForm from '@/app/components/Form/CreateCourseForm';
import CustomModal from '@/app/components/modal/CustomModal';

// import CourseTable from '@/app/components/table/CourseTable'

import { MainAdminContext } from '@/app/context/AdminContext';
import { CourseContext } from '@/app/context/CourseContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { Suspense, useContext, useEffect, useState } from 'react'

// Dynamically import the Announcement component with a loading state
const CourseTable = dynamic(() => import('@/app/components/table/CourseTable'), {
  loading: () => <Loader />,  // This is the fallback loading component
  ssr: false,  // Disable server-side rendering (optional)
});


export default function CoursePage() {
  const{adminState} = useContext(MainAdminContext)
  const {courseDispatch} = useContext(CourseContext)
  const router = useRouter()

  async function fetchCourses(){
    try {
        const courseData = await getAllCourse(adminState);
        if(courseData){
          courseDispatch({
            type:"GET_COURSE",
            payload:courseData
          })
        }
    } catch (error) {
      console.log(error);
    }finally{
    }
  }

  useEffect(()=>{
    fetchCourses();
  },[])

  useEffect(() => {

    if (!adminState?.token) {
      router.push('/administratorLogin');
      // toast.success("You are logged in!");
    }
  }, [adminState?.token, router]);


  const [isModalOpen, setModalOpen] = useState({ addFaculty: false, viewDetails: false });

  const handleOpenModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: true })); // Open specific modal
  const handleCloseModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: false })); // Close specific modal

  return (
    <>
        <Suspense fallback={<Loader/>}>
          <div className='d-flex justify-content-end'>
            <ModalButton handleClick={() => handleOpenModal('addCourse')}>
              <i className="bi bi-journal-plus"></i> New Course
            </ModalButton>
          </div>

          <div className='mt-3'>
            <CourseTable fetchCourses={fetchCourses} />
          </div>
        </Suspense>

        
      {/* Modal component */}
      <CustomModal 
        id="addCourse"
        isVisible={isModalOpen.addCourse} 
        onClose={() => handleCloseModal("addCourse")}
        title="Course Registration"
        scrollable={"modal-dialog-scrollable"}
        >

        <CreateCourseForm fetchCourses={fetchCourses}
        onClose={() => handleCloseModal("addCourse")}
        />
        
      </CustomModal> 
    </>
  )
}
