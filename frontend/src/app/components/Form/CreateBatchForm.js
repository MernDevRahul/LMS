import React, { useContext, useState } from 'react';
import TrainerDropdown from '../Dropdown/TrainerSelectDropdown';
import toast from 'react-hot-toast';
import { createBatches } from '@/app/api/batchApi';
import { UserContext } from '@/app/context/UserContext';
import { MainAdminContext } from '@/app/context/AdminContext';
import CourseSingleDropdown from '../Dropdown/CourseSingleDropdown';

export default function CreateBatchForm({onClose}) {
  const { state } = useContext(UserContext);
  const { adminState } = useContext(MainAdminContext);  
  const [batchData, setBatchData] = useState({
    trainerId: !adminState.token? state.employeeId : "",
    courseId: "",
    timings: "",
    batchType: ""
  });


  // Function to convert time to hh:mm tt (AM/PM) format
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // The hour '0' should be '12'
    return `${hour}:${minutes} ${ampm}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(batchData);
    
    if (batchData.trainerId || batchData.courseId || batchData.timings || batchData.batchType) {
      let data =  !adminState.token ? await createBatches(state, batchData) : await createBatches(adminState, batchData);       
      if (data) {
          toast.success("Batch created successfully!");   
          onClose();
      } else {
        toast.error("Batch already exist or Internal server error.");
      }
    } else {
      toast.error("All fields are required!");
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className="col-12 col-md-6 mb-3">
            <p htmlFor="startTime" className="form-label">Course</p>
            <CourseSingleDropdown
              onCourseSelect={(id) => setBatchData(prev => ({ ...prev, courseId: id }))}
            />
          </div>

          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="timings" className="form-label">Time slot</label>
            <input
              type="time"
              id="timings"
              className="form-control"
              onChange={(e) => setBatchData((prev) => ({
                ...prev, 
                timings: formatTime(e.target.value)
              }))}
              required
            />
          </div>

          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="schedule" className="form-label">Schedule</label>
            <select
              id="schedule"
              className="form-select"
              onChange={(e) => setBatchData((prev) => ({ ...prev, batchType: e.target.value }))}
              required
            >
              <option value="">Select Schedule</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
            </select>
          </div>

          {
            !adminState.token?
          null:
          <div className="col-12 col-md-6 mb-3">
          <p htmlFor="trainer" className="form-label">Trainer</p>
          <TrainerDropdown
            onTrainerSelect={(id) => setBatchData(prev => ({ ...prev, trainerId: id }))}
          />
        </div>
          }

        </div>
        <button type="submit" className="btn btn-primary">Create Batch</button>
      </form>
    </div>
  );
}
