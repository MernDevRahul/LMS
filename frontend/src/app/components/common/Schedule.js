// components/SchedulePage.js

import React from 'react';

const Schedule = () => {
  const scheduleData = [
    {
      course: "Full Stack Development",
      instructor: "Adam Sir",
      date: "January 15, 2025",
      time: "10:00 AM - 12:00 PM",
    },
    {
      course: "Advanced Python",
      instructor: "Rishi Sir",
      date: "January 16, 2025",
      time: "2:00 PM - 4:00 PM",
    },
    {
      course: "Digital Marketing",
      instructor: "Vinayak Sir",
      date: "January 17, 2025",
      time: "1:00 PM - 3:00 PM",
    },
    {
      course: "Graphic Design",
      instructor: "Harshit Sir",
      date: "January 18, 2025",
      time: "9:00 AM - 11:00 AM",
    },
    {
      course: "Video Editing",
      instructor: "Harshit Sir",
      date: "January 19, 2025",
      time: "3:00 PM - 5:00 PM",
    },
    {
      course: "DSA (Data Structures and Algorithms)",
      instructor: "Rishi Sir",
      date: "January 20, 2025",
      time: "11:00 AM - 1:00 PM",
    },
  ];

  return (
    <div className="container-fluid">
      <h2 className="text-center mb-4">Class Schedule</h2>

      {/* Schedule Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Sr</th>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.course}</td>
                <td>{item.instructor}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
