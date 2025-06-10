import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import StudentDropdown from "../Dropdown/StudentDropdown";

import { createSession } from "@/app/api/sessionAPI";
import { MainAdminContext } from "@/app/context/AdminContext";

const CreateSession = () => {
    const [sessionData, setSessionData] = useState({
        date: "",
        startTime: "",
        endTime: "",  
        batchId: "",
        attendance: [{ studentId: "", status: "" }]
    });

    const {adminState} = useContext(MainAdminContext)
    function handleStudentSelect(studentId) {
        setSessionData((prev) => ({
            ...prev,
            attendance: [{ ...prev.attendance[0], studentId }]
        }));
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        
        if (name === "status") {
            setSessionData((prev) => ({
                ...prev,
                attendance: [{ ...prev.attendance[0], status: value }]
            }));
        } else {
            setSessionData((prev) => ({ ...prev, [name]: value }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!sessionData.batchId || !sessionData.date || !sessionData.startTime || !sessionData.endTime || !sessionData.attendance[0].studentId || !sessionData.attendance[0].status) {
            toast.error("All fields are required!");
            return;
        }

        console.log("Submitting session data:", sessionData);

        try {
            const response = await createSession(adminState,sessionData);
            if (response) {
                toast.success("Session created successfully!");
            }
        } catch (error) {
            toast.error("Failed to create session!");
            console.error("Error:", error);
        }
    }

    return (
        <form id="edit-course-form" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="batchId" className="form-label">Batch Name</label>
                <input 
                    type="text"
                    id="batchId"
                    name="batchId"
                    className="form-control"
                    value={sessionData.batchId}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input 
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                    value={sessionData.date}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="startTime" className="form-label">Start Time</label>
                <input 
                    type="time"
                    id="startTime"
                    name="startTime"
                    className="form-control"
                    value={sessionData.startTime}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="endTime" className="form-label">End Time</label>
                <input 
                    type="time"
                    id="endTime"
                    name="endTime"
                    className="form-control"
                    value={sessionData.endTime}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Student Name</label>
                <StudentDropdown onStudentSelect={handleStudentSelect} />
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                    name="status"
                    className="form-control"
                    value={sessionData.attendance[0].status}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                </select>
            </div>

            <div className="text-end">
                <button type="submit" className="btn btn-success">Add</button>
            </div>
        </form>
    );
};

export default CreateSession;
