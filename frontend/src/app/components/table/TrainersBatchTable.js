"use client"
import React, { useContext, useEffect, useState, useMemo } from 'react';

import { MainAdminContext } from '../../context/AdminContext';
import { EmployeeContext } from '../../context/EmployeeContext';
import { CourseContext } from '../../context/CourseContext';
import { UserContext } from '../../context/UserContext';
import { StudentContext } from '../../context/StudentContext';

import { getAllBatchforSearch } from '@/app/api/batchApi';
import { getAllCourse } from '@/app/api/courseApi';
import { getAllEmp } from '@/app/api/employeeApi';
import { getAllStd } from '@/app/api/studentApi';
import BatchStudentsTable from './BatchStudentsTable';
import MeetButton from '../Button/GoogleMeetButton';
// import Link from 'next/link';
// import toast from 'react-hot-toast';

export default function TrainersBatchTable() {
  const [selectedBatchType, setSelectedBatchType] = useState('');
  const [batchData, setBatchData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [batchStudents, setBatchStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null); // Store selected batch for the modal

  const { state } = useContext(UserContext);
  const { adminState } = useContext(MainAdminContext);
  const { courseData, courseDispatch } = useContext(CourseContext);
  const { employeeData, employeeDispatch } = useContext(EmployeeContext);
  const { studentData, studentDispatch } = useContext(StudentContext);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data once when the component mounts

  // console.log(state.employeeId);

  const courseMap = useMemo(() => {
    return courseData.reduce((acc, course) => {
      acc[course._id] = course['Course Name'];
      return acc;
    }, {});
  }, [courseData]);

  const employeeMap = useMemo(() => {
    return employeeData.reduce((acc, employee) => {
      acc[employee._id] = `${employee['First Name']} ${employee['Last Name']}`;
      return acc;
    }, {});
  }, [employeeData]);

  async function fetchData() {
    try {
      const batch_data = await getAllBatchforSearch(adminState); // Fetch all batch data
      // console.log(batch_data);

      setBatchData(batch_data); // Set the batch data

      const course_data = !adminState.token ? await getAllCourse(adminState) : await getAllCourse(adminState);
      if (course_data) {
        courseDispatch({
          type: "GET_COURSE",
          payload: course_data
        });
      }

      const employee_data = !adminState.token ? await getAllEmp(adminState) : await getAllEmp(adminState);
      if (employee_data) {
        employeeDispatch({
          type: "GET_EMPLOYEE",
          payload: employee_data,
        });
      }

      const student_data = !adminState.token ? await getAllStd(state) : await getAllStd(adminState);
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

  const filteredBatch = useMemo(() => {
    return batchData?.filter((batch) => {
      const matchesBatchType = selectedBatchType ? batch.batchType === selectedBatchType : true;
      return matchesBatchType;
    });
  }, [batchData, selectedBatchType]);

  // Open the modal and pass the selected batch's data
  const openModal = (batch) => {
    const batchStudents = studentData.filter(student => student.batchIds.includes(batch._id));
    setSelectedBatch(batch);
    setIsModalOpen(true);
    setBatchStudents(batchStudents); // Store the filtered students
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBatch(null);
  };


  return (
    <>
      {/* Search Bar */}
      <div className="mb-2 d-flex">
        <select
          className="form-select shadow-none mt-0 w-25"
          value={selectedBatchType}
          onChange={(e) => setSelectedBatchType(e.target.value)}
        >
          <option value="" disabled>Select Schedule</option>
          <option value="">All</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
        </select>
      </div>

      <table className="table table-bordered mb-2" style={{ position: "relative" }}>
        <thead>
          <tr style={{ position: "sticky", zIndex: "5" }}>
            <th style={{ minWidth: "20px" }} className="bg-dark text-white">Sr</th>
            <th style={{ minWidth: "120px" }} className="bg-dark text-white">Batch Time</th>
            <th style={{ minWidth: "320px" }} className="bg-dark text-white">Course</th>
            <th style={{ minWidth: "180px" }} className="bg-dark text-white">Trainer</th>
            <th style={{ minWidth: "180px" }} className="bg-dark text-white">Student</th>
            <th style={{ minWidth: "160px",width:"160px" }} className="bg-dark text-white">Class Link</th>
          </tr>
        </thead>
        <tbody>
          {filteredBatch?.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center">No batches found</td>
            </tr>
          ) : (
            filteredBatch.filter(batch => batch.trainerId === state.employeeId).map((batch, index) => (
              <tr key={batch._id} className="text-black">
                <td style={{ padding: "5px" }}>{index + 1}</td>
                <td style={{ padding: "5px" }}>{batch.timings}  {batch.batchType==='Weekdays'?'(WD)':batch.batchType==='Weekends'?'(WE)':'(Custom)'} </td>
                <td style={{ padding: "5px" }}>
                  {courseMap[batch.courseId] || 'Course not found'}
                </td>
                <td style={{ padding: "5px" }}>
                  {employeeMap[batch.trainerId] || 'Trainer not found'}
                </td>

                <td style={{ padding: "2px", textAlign: "center" }}>
                  <button
                    className="modal-toggler btn btn-outline-primary btn-sm w-100"
                    onClick={() => openModal(batch)} // Open modal on click
                  >
                    {
                      studentData.filter((student) => student.batchIds.includes(batch._id)).length
                        ? `${studentData.filter((student) => student.batchIds.includes(batch._id)).length} Students`
                        : 'No Students'
                    }
                  </button>
                </td>

                <td style={{ padding: "2px", textAlign: "justify" }}>

                    <MeetButton batch={batch}/>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal fade show" style={{ display: 'block', background: "#00000090", padding: "10px" }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Batch Students</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}>
                </button>
              </div>
              <div className="modal-body">
                <BatchStudentsTable studentData={batchStudents} /> {/* Pass filtered students */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
