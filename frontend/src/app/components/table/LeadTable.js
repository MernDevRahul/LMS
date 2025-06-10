import React, { useContext } from "react";
import BooleanButton from "../Button/BooleanButton";
import ToggleDemoButton from "../Button/ToggleDemoButton";
import LeadStatusDropdown from "../Dropdown/LeadStatusDropdown";
import { LeadContext } from "@/app/context/LeadContext";
import { UserContext } from "@/app/context/UserContext";
import { MainAdminContext } from "@/app/context/AdminContext";
import { StudentContext } from "../../context/StudentContext";
import { getAllLead, updateLead } from "@/app/api/leadApi";
import RemarkDropdown from "../Dropdown/RemarkDropdown";
import CourseMultipleDropdown from "../Dropdown/CourseMultipleDropdown";

const LeadTable = () => {
  const { state } = useContext(UserContext);
  const { adminState } = useContext(MainAdminContext);
  const { leadData, leadDispatch } = useContext(LeadContext);
  const { studentData } = useContext(StudentContext);
  const [searchQuery, setSearchQuery] = React.useState(""); // State for search query


  async function fetchLeads() {
    try {
      let data = !adminState.token
        ? await getAllLead(state)
        : await getAllLead(adminState);

      if (data) {
        leadDispatch({
          type: "GET_LEAD",
          payload: data
        })
      }
    } catch (error) {
      console.log(error);

    }
  }

  function handleChange(index, e, field) {
    const updatedLeads = [...filteredLeads];
    updatedLeads[index][field] = e.target.value;
    leadDispatch({
      type: "GET_LEAD",
      payload: updatedLeads,
    });
  }

  async function updateLeadData(studentId, updatedData) {
    try {
      let data = !adminState.token
        ? await updateLead(state, studentId, updatedData)
        : await updateLead(adminState, studentId, updatedData);
      if (data) {
        fetchLeads();
        console.log('data update successfully');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCourseSelectionChange(id, index, selectedCourses) {
    try {
      const updatedLeads = [...leadData];

      // Calculate the total fee based on the selected courses
      const totalFee = selectedCourses.reduce(
        (sum, course) => sum + (course["Course Fee"] || 0),
        0
      );

      // Update the student's course list with only _id and Fee
      updatedLeads[index].Course = selectedCourses.map((course) => course._id);
      updatedLeads[index].Fee = totalFee;

      // console.log(updatedLeads[index]); // Verify the updated student data

      // Sync the data with backend or state management
      updateLeadData(id, {
        Course: selectedCourses.map((course) => course._id), // Send only _id to backend
        Fee: totalFee,
      });

    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (isoDate) => {
    if (!isoDate) return ""; // "No Record"
    const date = new Date(isoDate);
    // Extract parts of the date
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

 const filteredLeads = leadData?.filter(lead =>
    lead.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.Phone.includes(searchQuery) ||
    lead["Email id"].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid mt-3 px-0">
      <input
        type="text"
        id="Search by Name, Phone, or Email"
        placeholder="Search by Name, Phone, or Email"
        value={searchQuery}
        onChange={handleSearchChange}
        className="form-control mb-3"
        style={{ width: "30vw" }}
      />
      <div className="table-responsive"
        style={{ height: "calc(100vh - 250px)" }}
      >
        <table
          className="table table-bordered"
          style={{ position: "relative" }}
        >
          <thead>
            <tr style={{ position: "sticky", top: "-1px", zIndex: "1001" }}>
              <th style={{ minWidth: "20px", background: "orange" }}>Sr</th>
              <th style={{ minWidth: "180px", background: "orange" }}>
                TimeStamp
              </th>
              <th style={{ minWidth: "180px", background: "orange" }}>Name</th>
              <th style={{ minWidth: "180px", background: "orange" }}>Phone</th>
              <th style={{ minWidth: "250px", background: "orange" }}>
                Email ID
              </th>
              <th style={{ minWidth: "220px", background: "orange" }}>
                Course
              </th>
              <th style={{ minWidth: "100px", background: "orange" }}>Fee</th>
              <th style={{ minWidth: "200px", background: "orange" }}>
                Remark
              </th>
              <th style={{ minWidth: "270px", background: "orange" }}>
                Follow-up Date
              </th>
              <th style={{ minWidth: "70px", background: "orange" }}>
                Visited
              </th>
              <th style={{ minWidth: "150px", background: "orange" }}>Demo</th>
              <th style={{ minWidth: "150px", background: "orange" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads?.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">Loading...</td>
              </tr>
            ) : (
              filteredLeads?.map((lead, index) => (
                <tr
                  key={lead._id}
                  style={{
                    background: `${studentData &&
                        studentData.some((std) => std.leadId === lead._id)
                        ? "#b4ffb4"
                        : // lead.isVerified==="Not Verified" && lead["Admission Status"]==="Done"?
                        // "yellow"
                        // :
                        lead["Admission Status"] === "Done"
                          ? "#00cf6e"
                          : //-----
                          (lead.isVisited &&
                            lead["Admission Status"] === "Interested") ||
                            (lead.isDemonstrated &&
                              lead["Admission Status"] === "Interested")
                            ? "#ffdd79"
                            : lead["Admission Status"] === "Interested"
                              ? "#fffc82"
                              : lead["Admission Status"] === "Not Interested"
                                ? "#ededed"
                                : lead["Admission Status"] === "Wrong No"
                                  ? "#ff5050"
                                  : lead.isVisited && lead.isDemonstrated
                                    ? "#ffbf00"
                                    : lead.isVisited || lead.isDemonstrated
                                      ? "#fffc82"
                                      : "white" // Default color
                      }`,
                  }}
                >
                  <td
                    className="text-center"
                    style={{
                      background: "transparent",
                      padding: "8px 0 0 0",
                      minWidth: "20px",
                    }}
                  >
                    {index + 1}
                  </td>

                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "180px",
                    }}
                  >
                    <input
                      id={`TimeStamp-${index + 1}`}
                      type="text"
                      value={formatDate(lead.createdAt)}
                      className="form-control bg-transparent shadow-none border-0"
                      readOnly
                    />
                  </td>
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "180px",
                    }}
                  >
                    <input
                      id={`Name-${index + 1}`}
                      type="text"
                      value={lead["Name"]}
                      className="form-control bg-transparent shadow-none border-0"
                      disabled={
                        lead["Admission Status"] === "Not Interested" ||
                          lead["Admission Status"] === "Wrong No"
                          ? true
                          : false
                      }
                      readOnly={
                        studentData &&
                          studentData?.some((std) => std.leadId === lead._id)
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        handleChange(index, e, "Name")
                      }}
                      onBlur={(e) =>
                        updateLeadData(lead._id, { Name: e.target.value })
                      }
                    />
                  </td>
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "150px",
                    }}
                  >
                    <input
                      id={`Phone-${index + 1}`}
                      type="text"
                      value={lead.Phone}
                      className="form-control bg-transparent shadow-none border-0"
                      disabled={
                        lead["Admission Status"] === "Not Interested" ||
                          lead["Admission Status"] === "Wrong No"
                          ? true
                          : false
                      }
                      readOnly={
                        studentData && studentData?.some((std) => std.leadId === lead._id)
                          ? true
                          : false
                      }
                      maxLength={15}
                      onChange={(e) => {
                        handleChange(index, e, "Phone");
                      }}
                      onBlur={(e) =>
                        updateLeadData(lead._id, { Phone: e.target.value })
                      }
                    />
                  </td>
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "250px",
                    }}
                  >
                    <input
                      id={`Email-${index + 1}`}
                      type="text"
                      value={lead["Email id"]}
                      className="form-control bg-transparent shadow-none border-0"
                      disabled={
                        lead["Admission Status"] === "Not Interested" ||
                          lead["Admission Status"] === "Wrong No"
                          ? true
                          : false
                      }
                      readOnly={
                        studentData && studentData?.some((std) => std.leadId === lead._id)
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        handleChange(index, e, "Email id");
                      }}
                      onBlur={(e) =>
                        updateLeadData(lead._id, { "Email id": e.target.value })
                      }
                    />
                  </td>
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "220px",
                    }}
                  >
                    <CourseMultipleDropdown
                      indexId={index}
                      studentCourses={lead.Course || []}
                      disable={
                        lead["Admission Status"] === "Not Interested" ||
                          lead["Admission Status"] === "Wrong No" ||
                          (studentData &&
                            studentData?.some((std) => std.leadId === lead._id))
                          ? true
                          : false
                      }
                      onSelectionChange={(selectedCourses) =>
                        handleCourseSelectionChange(
                          lead._id,
                          index,
                          selectedCourses
                        )
                      }
                    />

                  </td>
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "100px",
                    }}
                  >
                    <input
                      id={`Fee-${index + 1}`}
                      type="text"
                      value={lead.Fee || ""}
                      className="form-control bg-transparent shadow-none border-0"
                      disabled={
                        lead["Admission Status"] === "Not Interested" ||
                          lead["Admission Status"] === "Wrong No"
                          ? true
                          : false
                      }
                      placeholder="Enter Fee"
                      readOnly
                    />
                  </td>
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "200px",
                    }}
                  >
                    <RemarkDropdown lead={lead} index={index} />
                  </td>
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "270px",
                    }}
                  >
                    {lead["Admission Status"] === "Not Interested" ||
                      lead["Admission Status"] === "Wrong No" ? (
                      <input
                        type="text"
                        className={`form-control bg-transparent shadow-none border-0 ${lead["Admission Status"] === "Wrong No"
                            ? "text-light"
                            : "text-secondary"
                          }`}
                        id={`Diable-${index + 1}`}
                        value="Not Applicable"
                        disabled
                      />
                    ) : (
                      <div className="d-flex">
                        <input
                          id={`FollowUpDate-${index + 1}-date`}
                          type="date"
                          className="form-control bg-transparent shadow-none border-0"
                          disabled={
                            lead["Admission Status"] === "Done" ? true : false
                          }
                          style={{ width: "140px" }}
                          value={lead["Follow-Up Date"]?.split("T")[0] || ""}
                          min={new Date().toISOString().split("T")[0]} // Set min to today's date
                          onChange={(e) => {
                            const updatedLeads = [...filteredLeads];
                            const updatedDate = e.target.value;
                            updatedLeads[index]["Follow-Up Date"] = updatedDate
                              ? `${updatedDate}T${lead["Follow-Up Date"]?.split("T")[1] ||
                              "00:00:00"
                              }`
                              : "";
                            leadDispatch({
                              type: "GET_LEAD",
                              payload: updatedLeads,
                            });
                          }}
                          onBlur={async (e) => {
                            try {
                              const updatedFollowUpDate = e.target.value
                                ? `${e.target.value}T${lead["Follow-Up Date"]?.split("T")[1] ||
                                "00:00:00"
                                }`
                                : "";
                              await updateLeadData(lead._id, {
                                "Follow-Up Date": updatedFollowUpDate,
                              });
                            } catch (error) {
                              console.error(
                                "Error updating follow-up date:",
                                error
                              );
                            }
                          }}
                        />
                        <input
                          id={`FollowUpDate-${index + 1}-time`}
                          type="time"
                          className="form-control bg-transparent shadow-none border-0"
                          value={lead["Follow-Up Date"]?.split("T")[1] || ""}
                          disabled={
                            lead["Admission Status"] === "Done" ? true : false
                          }
                          style={{ width: "125px" }}
                          onChange={(e) => {
                            const updatedLeads = [...filteredLeads];
                            const updatedTime = e.target.value;
                            updatedLeads[index]["Follow-Up Date"] = updatedTime
                              ? `${lead["Follow-Up Date"]?.split("T")[0] ||
                              new Date().toISOString().split("T")[0]
                              }T${updatedTime}`
                              : "";
                            leadDispatch({
                              type: "GET_LEAD",
                              payload: updatedLeads,
                            })
                          }}
                          onBlur={async (e) => {
                            try {
                              const updatedFollowUpDate = e.target.value
                                ? `${lead["Follow-Up Date"]?.split("T")[0] ||
                                new Date().toISOString().split("T")[0]
                                }T${e.target.value}`
                                : "";
                              await updateLeadData(lead._id, {
                                "Follow-Up Date": updatedFollowUpDate,
                              });
                            } catch (error) {
                              console.error(
                                "Error updating follow-up time:",
                                error
                              );
                            }
                          }}
                        />
                      </div>
                    )}
                  </td>
                  <td
                    className="text-center"
                    style={{ padding: "1px", minWidth: "70px" }}
                  >
                    <BooleanButton
                      trueValue={"Yes"}
                      falseValue={"No"}
                      disable={
                        lead["Admission Status"] === "Not Interested" ||
                          lead["Admission Status"] === "Wrong No" ||
                          lead["Admission Status"] === "Done"
                          ? true
                          : false
                      }
                      booleanValue={lead.isVisited}
                      onClick={() => {
                        const updatedLeads = [...filteredLeads];
                        updatedLeads[index].isVisited =
                          !updatedLeads[index].isVisited;
                        leadDispatch({
                          type: "GET_LEAD",
                          payload: updatedLeads,
                        });
                        updateLeadData(lead._id, {
                          isVisited: updatedLeads[index].isVisited,
                        });
                      }}
                    />
                  </td>
                  <td style={{ padding: "1px", minWidth: "150px" }}>
                    <ToggleDemoButton
                      id={lead._id} // Unique id for the lead
                      index={index}
                      disable={
                        lead["Admission Status"] === "Not Interested" ||
                          lead["Admission Status"] === "Wrong No" ||
                          lead["Admission Status"] === "Done"
                          ? true
                          : false
                      }
                      isDemonstrated={lead.isDemonstrated} // Whether demonstrated or not
                      demoBy={lead["Demo by"] || ""} // Pass the current "Demo by" or empty string
                      onToggle={(newValue) => {
                        // Handle toggling the demonstration state
                        const updatedLeads = [...filteredLeads];
                        updatedLeads[index].isDemonstrated = newValue;
                        leadDispatch({
                          type: "GET_LEAD",
                          payload: updatedLeads,
                        }); // Update the local state
                        updateLeadData(lead._id, { isDemonstrated: newValue }); // Update backend
                      }}
                    />
                  </td>
                  <td style={{ padding: "1px", minWidth: "100px" }}>
                    <LeadStatusDropdown
                      id={lead._id}
                      lead={lead}
                      updateLeadData={updateLeadData}
                      index={index}
                      disable={
                        studentData && studentData?.some((std) => std.leadId === lead._id)
                          ? true
                          : false
                      }
                      admissionStatus={lead["Admission Status"]}
                      onUpdateStatus={(newStatus) => {
                        const updatedLeads = [...filteredLeads];
                        updatedLeads[index]["Admission Status"] = newStatus;
                        leadDispatch({
                          type: "GET_LEAD",
                          payload: updatedLeads,
                        });
                        updateLeadData(lead._id, {
                          "Admission Status": newStatus,
                        });
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
