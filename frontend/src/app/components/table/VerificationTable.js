"use client";
import React, { useContext, useState } from "react";
import { getAllLead, updateLead } from "@/app/api/leadApi";
import { MainAdminContext } from "@/app/context/AdminContext";
import { PaymentContext } from "@/app/context/PaymentContext";
import { StudentContext } from "../../context/StudentContext";
import { UserContext } from "@/app/context/UserContext";
import { LeadContext } from "@/app/context/LeadContext";
import { updatePayment } from "@/app/api/paymentApi";
import CourseMultipleDropdown from "../Dropdown/CourseMultipleDropdown";
import toast from "react-hot-toast";

const VarificationTable = ({ leads, handleCourseSelectionChange }) => {
  const { paymentData ,paymentDispatch} = useContext(PaymentContext);
  const { studentData } = useContext(StudentContext);
  const { leadDispatch } = useContext(LeadContext);
  const { adminState } = useContext(MainAdminContext);
  const { state } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = leads?.filter(
    (lead) =>
      lead.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.Remark.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Lead Update
  const updateLeadData = async (payment,leadId, updatedData) => {
    try {
        let status = !adminState.token
        ? await updateLead(state, leadId, updatedData)
        : await updateLead(adminState, leadId, updatedData);
       
        let PaymentStatus = !adminState.token
        ? await updatePayment(state,payment._id,updatedData)
        : await updatePayment(adminState,payment._id,updatedData)
        
        if (status == 200) {
          let data = !adminState.token
            ? await getAllLead(state)
            : await getAllLead(adminState);
          if (data) {
            leadDispatch({
              type: "GET_LEAD",
              payload: data,
            });
          }
        }
        
        // if (PaymentStatus == 200) {
        //   let data = !adminState.token
        //     ? await updatePayment(state)
        //     : await updatePayment(adminState);
        //     if (data) {
        //       leadDispatch({
        //         type: "GET_LEAD",
        //         payload: data,
        //       });
        //     }
        // }
  

        console.log(updatedData.isVerified);
        if(updatedData.isVerified=='Verified'){
          toast.success("Payment Verified.")
        }
        if(updatedData.isVerified=='Not Verified'){
          toast.error("Payment Not Verified.")
        }
        if(updatedData.isVerified=='Under Review'){
          toast.error("Payment Under Review.")
        }
        


    } catch (error) {
      console.error("Error updating lead data:", error);
    }
  };

  // Handle Input Change
  function handleChange(index, e, field) {
    const updatedLeads = [...leads];
    updatedLeads[index][field] = e.target.value;
    leadDispatch({
      type: "GET_LEAD",
      payload: updatedLeads,
    });
  }

  return (
    <div className="container-fluid mt-3 px-0">
      <input
        id="Search"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control mb-3"
        style={{ width: "25vw" }}
      />
      <div className="table-responsive" style={{ height: "calc(100vh - 200px)" }}>
        <table className="table table-bordered">
          <thead>
            <tr style={{ position: "sticky", top: "-1px", zIndex: "1001" }}>
              <th style={{ minWidth: "20px", background: "#b562ff" }}>Sr</th>
              <th style={{ minWidth: "180px", background: "#b562ff" }}>Name</th>
              <th style={{ minWidth: "100px", background: "#b562ff" }}>Fee</th>
              <th style={{ minWidth: "220px", background: "#b562ff" }}>Course</th>
              <th style={{ minWidth: "150px", background: "#b562ff" }}>Paid Amount</th>
              <th style={{ minWidth: "150px", background: "#b562ff" }}>Payer Name</th>
              <th style={{ minWidth: "150px", background: "#b562ff" }}>MOP</th>
              <th style={{ minWidth: "150px", background: "#b562ff" }}>PlatForm</th>
              <th style={{ minWidth: "150px", background: "#b562ff" }}>Verification</th>
              <th style={{ minWidth: "180px", background: "#b562ff" }}>Remark</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads?.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              filteredLeads?.map((lead, index) => {
                const pay = paymentData?.find((pay) => pay.EmiId === lead.EmiId);
                return (
                  pay && (
                    <tr
                      key={lead._id}
                      style={{
                        background: `${pay.isDispute ?
                          "orange"
                          :
                          lead.isVerified == "Verified"
                            ? "#54ff54"
                            : lead.isVerified == "Not Verified"
                              ? "#fffa35"
                              : "#ff3434"
                          }`,
                      }}
                      title={`${pay.isDispute? `"${lead["Name"]}" raised a Dispute at this Payment record`: ""}`}
                    >
                      {/* Sr No */}
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

                      {/* Name */}
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
                          // disabled={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") ? true : false}
                          disabled={true}
                          readOnly={
                            studentData &&
                              studentData?.some((std) => std.leadId === lead._id)
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            handleChange(index, e, "Name");
                          }}
                        />
                      </td>

                      {/* Fee */}
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
                          // disabled={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") ? true : false}
                          disabled={true}
                          placeholder="Enter Fee"
                          readOnly
                          onChange={(e) => {
                            handleChange(index, e, "Fee");
                          }}
                        />
                      </td>

                      {/* Coursee */}
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
                          disable={true}
                        />
                      </td>

                      {/* Paid Amount */}
                      <td
                        style={{
                          background: "transparent",
                          padding: "2px",
                          minWidth: "100px",
                        }}
                      >
                        <input
                          id={`PaidAmount-${index + 1}`}
                          type="text"
                          defaultValue={
                            paymentData?.length > 0
                              ? paymentData?.find((pay) => pay.EmiId === lead.EmiId)
                                ?.amount || "No Payment"
                              : "Loading..."
                          }
                          className="form-control bg-transparent shadow-none border-0"
                          // disabled={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") ? true : false}
                          disabled={true}
                          placeholder="Enter Fee"
                          readOnly
                        />
                      </td>

                      {/* Payer Name */}
                      <td
                        style={{
                          background: "transparent",
                          padding: "2px",
                          minWidth: "100px",
                        }}
                      >
                        <input
                          id={`PayerName-${index + 1}`}
                          type="text"
                          defaultValue={
                            paymentData?.length > 0
                              ? paymentData?.find((pay) => pay.EmiId === lead.EmiId)
                                ?.payerName || "Not Mention"
                              : "Loading..."
                          }
                          className="form-control bg-transparent shadow-none border-0"
                          // disabled={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") ? true : false}
                          disabled={true}
                          placeholder="Enter Fee"
                          readOnly
                        />
                      </td>

                      {/* MOP Name */}
                      <td
                        style={{
                          background: "transparent",
                          padding: "2px",
                          minWidth: "100px",
                        }}
                      >
                        <input
                          id={`MOP-${index + 1}`}
                          type="text"
                          defaultValue={
                            paymentData?.length > 0
                              ? paymentData?.find((pay) => pay.EmiId === lead.EmiId)
                                ?.MOP || "Not Mention"
                              : "Loading..."
                          }
                          className="form-control bg-transparent shadow-none border-0"
                          // disabled={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") ? true : false}
                          disabled={true}
                          placeholder="Enter Fee"
                          readOnly
                        />
                      </td>

                      {/* Payment Platform */}
                      <td
                        style={{
                          background: "transparent",
                          padding: "2px",
                          minWidth: "100px",
                        }}
                      >
                        <input
                          id={`Platform-${index + 1}`}
                          type="text"
                          defaultValue={
                            paymentData?.length > 0
                              ? paymentData?.find((pay) => pay.EmiId === lead.EmiId)
                                ?.platform || "---"
                              : "Loading..."
                          }
                          className="form-control bg-transparent shadow-none border-0"
                          // disabled={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") ? true : false}
                          disabled={true}
                          placeholder="Enter Fee"
                          readOnly
                        />
                      </td>

                      {/* isVerified */}
                      <td
                        className="text-center"
                        style={{ padding: "1px", minWidth: "150px" }}
                      >
                        <select
                          id={`Verify-${index + 1}`}
                          value={lead.isVerified} // Directly store the selected string
                          onChange={(e) => {
                            const newValue = e.target.value; // Store selected string value
                            const updatedLeads = [...leads];
                            updatedLeads[index].isVerified = newValue;
                            leadDispatch({
                              type: "GET_LEAD",
                              payload: updatedLeads,
                            });
                            const payment = paymentData?.find((pay) => pay.EmiId === lead.EmiId)
                            updateLeadData(payment, lead._id, { isVerified: newValue });
                          }}
                          className="form-select shadow-none"
                        >
                          <option value="Not Verified">Not Verified</option>
                          <option value="Verified">Verified</option>
                          <option value="Under Review">Under Review</option>
                        </select>
                      </td>

                      {/* Remark */}
                      <td
                        style={{
                          background: "transparent",
                          padding: "2px",
                          minWidth: "150px",
                        }}
                      >
                        <input
                          id={`Remark-${index + 1}`}
                          type="text"
                          value={lead.Remark}
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
                          maxLength={15}
                          onChange={(e) => {
                            handleChange(index, e, "Remark");
                          }}
                          onBlur={(e) =>
                            updateLeadData(lead._id, { Remark: e.target.value })
                          }
                        />
                      </td>
                    </tr>
                  )
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VarificationTable;
