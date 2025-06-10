import React from 'react';

const WorkReport = () => {
  const reportData = [
    {
      employee: "Alice Johnson",
      task: "Design Website",
      deadline: "January 25, 2025",
      status: "In Progress",
      completionDate: "-",
    },
    {
      employee: "Bob Williams",
      task: "Develop Backend API",
      deadline: "January 22, 2025",
      status: "Completed",
      completionDate: "January 20, 2025",
    },
    {
      employee: "Charlie Davis",
      task: "Write Technical Documentation",
      deadline: "January 28, 2025",
      status: "Pending",
      completionDate: "-",
    },
    {
      employee: "David Lee",
      task: "Create Marketing Plan",
      deadline: "January 24, 2025",
      status: "In Progress",
      completionDate: "-",
    },
    {
      employee: "Eva Martin",
      task: "Set up DevOps Pipeline",
      deadline: "January 30, 2025",
      status: "Pending",
      completionDate: "-",
    },
  ];

  return (
    <div>
      <h2 className="text-center mb-4">Work Report</h2>

      {/* Work Report Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Sr</th>
              <th>Employee Name</th>
              <th>Task Assigned</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Completion Date</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item,index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.employee}</td>
                <td>{item.task}</td>
                <td>{item.deadline}</td>
                <td>{item.status}</td>
                <td>{item.completionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkReport;
