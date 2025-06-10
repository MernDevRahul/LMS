"use client"
import { getAllBatchforSearch } from '@/app/api/batchApi';
import { getAllCourse } from '@/app/api/courseApi';
import { getAllEmp } from '@/app/api/employeeApi';
import { getStudentById } from '@/app/api/studentApi';
import { CourseContext } from '@/app/context/CourseContext';
import { EmployeeContext } from '@/app/context/EmployeeContext';
import { StudentContext } from '@/app/context/StudentContext';
import { StudentLoginContext } from '@/app/context/StudentLoginContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useMemo, useState } from 'react'

export default function SchedulePage() {
  const { studentState } = useContext(StudentLoginContext);
  const [batchData, setBatchData] = useState([]);
  const { courseData, courseDispatch } = useContext(CourseContext);
  const { employeeData, employeeDispatch } = useContext(EmployeeContext);
  const { studentData, studentDispatch } = useContext(StudentContext);

  const router = useRouter();

  const employeeMap = useMemo(() => {
    return employeeData.reduce((acc, employee) => {
      acc[employee._id] = `${employee['First Name']} ${employee['Last Name']}`;
      return acc;
    }, {});
  }, [employeeData]);

  const courseMap = useMemo(() => {
    return courseData.reduce((acc, course) => {
      acc[course._id] = course['Course Name'];
      return acc;
    }, {});
  }, [courseData]);

  // const filteredBatch = useMemo(() => batchData, [batchData]);
  // filteredBatch.filter(batch => studentData.batchIds.includes(batch._id))


  async function fetchData() {
    try {
      const batch_data = await getAllBatchforSearch(studentState); // Fetch all batch data
      // console.log(batch_data);

      setBatchData(batch_data); // Set the batch data

      const course_data = await getAllCourse(studentState);
      if (course_data) {
        courseDispatch({
          type: "GET_COURSE",
          payload: course_data
        });
      }

      const employee_data = await getAllEmp(studentState);
      if (employee_data) {
        employeeDispatch({
          type: "GET_EMPLOYEE",
          payload: employee_data,
        });
      }

      const student_data = await getStudentById(studentState);

      if (student_data) {
        studentDispatch({
          type: "GET_STUDENT",
          payload: student_data
        })
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Fetch data once when the component mounts

  useEffect(() => {
    // console.log(studentState);

    if (!studentState?.token) {
      router.push('/studentLogin');
      // toast.success("You are logged in!");
    }
  }, [studentState?.token, router]);

  return (
    <table className="table table-bordered mb-2" style={{ position: "relative" }}>
      <thead>
        <tr style={{ position: "sticky", zIndex: "5" }}>
          <th style={{ minWidth: "20px" }} className="bg-dark text-white">Sr</th>
          <th style={{ minWidth: "200px" }} className="bg-dark text-white">Batch Time</th>
          <th style={{ minWidth: "320px" }} className="bg-dark text-white">Course</th>
          <th style={{ minWidth: "180px" }} className="bg-dark text-white">Trainer</th>
          <th style={{ minWidth: "100px" }} className="bg-dark text-white">Class Link</th>
        </tr>
      </thead>
      <tbody>
        {batchData?.length === 0 ? (
          <tr>
            <td colSpan="10" className="text-center">No batches found</td>
          </tr>
        ) : (
          batchData
            .filter(batch => studentData?.batchIds?.includes(batch._id)) // Apply filtering here
            .map((batch, index) => (
              <tr key={batch._id} className="text-black">
                <td style={{ padding: "5px" }}>{index + 1}</td>
                <td style={{ padding: "5px" }}><span style={{ display: "flex", justifyContent: "space-between", width: "100%" }}><span>{batch.timings}</span> <span style={{ paddingRight: "15px" }}>{batch.batchType}</span></span></td>
                <td style={{ padding: "5px" }}>
                  {courseMap[batch.courseId] || 'Course not found'}
                </td>
                <td style={{ padding: "5px" }}>
                  {employeeMap[batch.trainerId] || 'Trainer not found'}
                </td>
                <td style={{ padding: "2px", textAlign: "center" }}>
                  {/* <MeetButton batch={batch}/> */}
                  {/* {batch.BatchLink} */}
                  <Link href={`${batch.BatchLink === "" ? "schedule" : batch.BatchLink}`}>
                    <button className={`${batch.BatchLink === "" ?"btn btn-outline-primary":"btn btn-success"} btn-sm w-100`}>{batch.BatchLink === "" ? "Not availaible" : "Join Now"}</button>
                  </Link>
                </td>
              </tr>
            ))
        )}
      </tbody>


    </table>
  )
}
