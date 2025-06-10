import React from 'react';

export default function BatchStudentsTable({ studentData }) {

  return (
    <table className="table table-bordered">
      <thead>
        <tr style={{ position: "sticky", zIndex: "5" }}>
          <th style={{ minWidth: "20px" }} className="bg-dark text-white">Sr</th>
          <th style={{ minWidth: "110px" }} className="bg-dark text-white">Student Id</th>
          <th style={{ minWidth: "250px" }} className="bg-dark text-white">Name</th>
          <th style={{ minWidth: "250px" }} className="bg-dark text-white">Email</th>
          <th style={{ minWidth: "200px" }} className="bg-dark text-white">Phone</th>
        </tr>
      </thead>
      <tbody>
        {
          studentData?.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No Students found</td>
            </tr>
          ) : (
            studentData.map((student, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{student.studentId}</td>
                <td>{student.Name}</td>
                <td>{student['Email id']}</td>
                <td>{student.Phone}</td>
              </tr>
            ))
          )
        }
      </tbody>
    </table>
  );
}
