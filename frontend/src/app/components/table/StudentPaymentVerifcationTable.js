"use client";
import React, { useContext, useState } from "react";
import { MainAdminContext } from "@/app/context/AdminContext";
import { PaymentContext } from "@/app/context/PaymentContext";
import { StudentContext } from "../../context/StudentContext";
import { UserContext } from "@/app/context/UserContext";
import { updatePayment } from "@/app/api/paymentApi";
import { getAllStd } from "@/app/api/studentApi";
import CourseMultipleDropdown from "../Dropdown/CourseMultipleDropdown";


const StudentPaymentVerificationTable = () => {
    const { paymentData, paymentDispatch } = useContext(PaymentContext);
    const { studentData, studentDispatch } = useContext(StudentContext);
    const { adminState } = useContext(MainAdminContext);
    const { state } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredStudents = studentData?.filter(
        (student) =>
            student?.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student?.["Email id"].toLowerCase().includes(searchQuery.toLowerCase())
    );



    async function fetchStudent() {
        try {
            let data = !adminState.token
                ? await getAllStd(state)
                : await getAllStd(adminState);

            if (data) {
                studentDispatch({
                    type: "GET_STUDENT",
                    payload: data
                })
            }
        } catch (error) {
            console.log(error);

        }
    }


    async function updatePaymentData(studentId, updatedData) {
        try {
            let data = !adminState.token
                ? await updatePayment(state, studentId, updatedData)
                : await updatePayment(adminState, studentId, updatedData);
            if (data) {
                fetchStudent();
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(index, e, field) {
        const updatedStudents = [...studentData];
        updatedStudents[index][field] = e.target.value;
        studentDispatch({
            type: "GET_STUDENT",
            payload: updatedStudents
        });
    }

    return (
        <div className="container-fluid mt-3 px-0">
            <input
                id="SearchPayment"
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control mb-3"
                style={{ width: "25vw" }} />

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
                            <th style={{ minWidth: "200px", background: "#b562ff" }}>Dispute Reason</th>
                            <th style={{ minWidth: "100px", background: "#b562ff" }}>Dispute</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents?.length === 0 ? (
                            <tr>
                                <td colSpan="10" className="text-center">
                                    No Data
                                </td>
                            </tr>
                        ) : (
                            paymentData?.map((payment, index) => {
                                const student = filteredStudents?.find((std) => std.EmiId === payment.EmiId);

                                if (!student) return null;

                                return (
                                    <tr
                                        key={payment._id}
                                        style={{
                                            background: payment.isDispute ? "#ff3434"
                                                : payment.isVerified === "Verified" ? "#54ff54"
                                                    : payment.isVerified === "Not Verified" ? "#fffa35"
                                                        : "orange",
                                        }}
                                        title={payment.isDispute ? `"${student.Name}" raised a Dispute at this Payment record` : ""}>
                                        {/* Sr No */}
                                        <td className="text-center"
                                            style={{ background: "transparent", padding: "8px 0 0 0", minWidth: "20px" }}>
                                            {index + 1}
                                        </td>

                                        {/* Name */}
                                        <td style={{ background: "transparent", padding: "2px", minWidth: "180px" }}>
                                            <input
                                                id={`Name-${index + 1}`}
                                                type="text"
                                                value={student.Name}
                                                className="form-control bg-transparent shadow-none border-0"
                                                disabled
                                                readOnly />
                                        </td>

                                        {/* Fee */}
                                        <td style={{ background: "transparent", padding: "2px", minWidth: "100px" }}>
                                            <input
                                                id={`Fee-${index + 1}`}
                                                type="text"
                                                value={student.Fee || ""}
                                                className="form-control bg-transparent shadow-none border-0"
                                                disabled
                                                readOnly />
                                        </td>

                                        {/* Course */}
                                        <td style={{ background: "transparent", padding: "2px", minWidth: "220px", }}>
                                            <CourseMultipleDropdown
                                                indexId={index}
                                                studentCourses={student.Course || []}
                                                disable />
                                        </td>

                                        {/* Paid Amount */}
                                        <td style={{ background: "transparent", padding: "2px", minWidth: "100px", }}>
                                            <input
                                                id={`PaidAmount-${index + 1}`}
                                                type="text"
                                                value={payment?.amount || "No Payment"}
                                                className="form-control bg-transparent shadow-none border-0"
                                                disabled
                                                readOnly />
                                        </td>

                                        {/* Payer Name */}
                                        <td style={{ background: "transparent", padding: "2px", minWidth: "100px", }}>
                                            <input
                                                id={`PayerName-${index + 1}`}
                                                type="text"
                                                value={payment?.payerName || "Not Mention"}
                                                className="form-control bg-transparent shadow-none border-0"
                                                disabled
                                                readOnly />
                                        </td>

                                        {/* MOP Name */}
                                        <td style={{ background: "transparent", padding: "2px", minWidth: "100px", }}>
                                            <input
                                                id={`MOP-${index + 1}`}
                                                type="text"
                                                value={payment?.MOP || "Not Mention"}
                                                className="form-control bg-transparent shadow-none border-0"
                                                disabled
                                                readOnly />
                                        </td>

                                        {/* Payment Platform */}
                                        <td style={{ background: "transparent", padding: "2px", minWidth: "100px", }}>
                                            <input
                                                id={`Platform-${index + 1}`}
                                                type="text"
                                                value={payment?.platform || "---"}
                                                className="form-control bg-transparent shadow-none border-0"
                                                disabled
                                                readOnly />
                                        </td>

                                        {/* isVerified */}
                                        <td className="text-center"
                                            style={{ padding: "1px", minWidth: "150px" }}>
                                            <select
                                                className="form-select shadow-none"
                                                id={`Verify-${index + 1}`}
                                                value={payment.isVerified}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    const updatedPayments = [...paymentData];
                                                    updatedPayments[index].isVerified = newValue;
                                                    paymentDispatch({
                                                        type: "GET_PAYMENT",
                                                        payload: updatedPayments,
                                                    });
                                                    updatePaymentData(payment._id, { isVerified: newValue });
                                                }} >
                                                <option value="Not Verified">Not Verified</option>
                                                <option value="Verified">Verified</option>
                                                <option value="Under Review">Under Review</option>
                                            </select>
                                        </td>

                                        {/* Dispute Reason */}
                                        <td style={{ background: "transparent", padding: "2px", minWidth: "200px", }}>
                                            <input
                                                id={`disputeReason-${index + 1}`}
                                                type="text"
                                                value={payment?.disputeReason || " "}
                                                className="form-control bg-transparent shadow-none border-0"
                                                disabled
                                                readOnly />
                                        </td>

                                        {/* Dispute Raised */}
                                        <td style={{ padding: "2px", minWidth: "150px", }} >
                                            <button
                                                className={`btn ${payment.isDispute ? "btn-outline-danger" : "btn-outline-secondary"} rounded-0 w-100`}
                                                onClick={() => {
                                                    const updatedPayments = [...paymentData];
                                                    updatedPayments[index].isDispute = !payment.isDispute;
                                                    paymentDispatch({
                                                        type: "GET_PAYMENT",
                                                        payload: updatedPayments,
                                                    });
                                                    updatePaymentData(payment._id, {
                                                        isDispute:
                                                            updatedPayments[index].isDispute,
                                                    });
                                                }} >
                                                {payment.isDispute ? "Raised" : "No Dispute"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentPaymentVerificationTable;
