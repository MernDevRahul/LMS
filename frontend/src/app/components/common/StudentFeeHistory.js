"use client";
import React, { useContext, useState } from 'react';
import { StudentLoginContext } from '@/app/context/StudentLoginContext';
import { PaymentContext } from '@/app/context/PaymentContext';
import { updatePayment } from '@/app/api/paymentApi';
import toast from 'react-hot-toast';

export default function StudentFeeHistory() {
    const { paymentData, paymentDispatch } = useContext(PaymentContext);
    const { studentState } = useContext(StudentLoginContext);
    
    const [showModal, setShowModal] = useState(false);
    const [disputeReason, setDisputeReason] = useState('');
    const [selectedPaymentId, setSelectedPaymentId] = useState(null);

    const formatDate = (isoDate) => {
        if (!isoDate) return ""; // "No Record"
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear().toString().slice(-2);
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = date.getHours() >= 12 ? "PM" : "AM";

        return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
    };

    async function updatePaymentData(paymentId, updatedData) {
        try {
            let data = await updatePayment(studentState, paymentId, updatedData);
            if (data) {
                toast.success("Dispute Raised.");
            } else {
                toast.error("Something Went Wrong!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDisputeClick = (paymentId) => {
        setSelectedPaymentId(paymentId);
        setShowModal(true);
    };

    const handleSubmitDispute = () => {
        const updatedPayments = [...paymentData];
        const paymentIndex = updatedPayments.findIndex(payment => payment._id === selectedPaymentId);

        if (paymentIndex !== -1) {
            updatedPayments[paymentIndex].isDispute = true;
            updatedPayments[paymentIndex].disputeReason = disputeReason;
            
            paymentDispatch({
                type: "GET_PAYMENT",
                payload: updatedPayments,
            });
            
            updatePaymentData(selectedPaymentId, {
                isDispute: true,
                disputeReason: disputeReason,
            });

            setShowModal(false);
            setDisputeReason('');
        }
    };

    return (
        <div className="col-md-12 mb-5 px-0">
            <div className="card mb-3">
                <h5 className="p-3 border-bottom">Paid History</h5>
                <div className="card-body">
                    {paymentData.length > 0 ? (
                        paymentData.map((payment, index) => (
                            <div key={index} className="row mb-2">
                                <div className="col-sm-6">
                                    <h6 className="mb-0">
                                        <i className="bi bi-cash-coin me-2 fs-5 text-dark"></i>Amount
                                    </h6>
                                </div>
                                <div className="col-sm-6 mt-md-0 my-2" style={{ color: "green" }}>
                                    <i className="bi bi-currency-rupee me-1 fs-5"></i> {payment?.amount}
                                </div>
                                {/* Timestamp */}
                                <div className="col-sm-6">
                                    <h6 className="mb-0">
                                        <i className="bi bi-calendar-check me-2 fs-5 text-dark"></i>Full Date and Time
                                    </h6>
                                </div>
                                <div className="col-sm-6 mt-md-0 my-2 text-primary">
                                    {formatDate(payment?.createdAt)}
                                </div>
                                {/* Payment Mode */}
                                <div className="col-sm-6">
                                    <h6 className="mb-0">
                                        <i className="bi bi-receipt me-2 fs-5 text-dark"></i>Payment Mode
                                    </h6>
                                </div>
                                <div className="col-sm-6 mt-md-0 my-2 text-primary">
                                    {payment?.MOP === "Online Payment" ? payment?.platform : payment?.MOP}
                                </div>
                                
                                <div className='d-flex justify-content-end'>
                                    <span>
                                        <button
                                            className='btn btn-outline-danger btn-sm'
                                            onClick={() => handleDisputeClick(payment._id)}
                                            disabled={payment.isDispute ? true : false}>
                                            {payment.isDispute ? "Raised" : "Dispute"}
                                        </button>
                                    </span>
                                </div>

                                <hr className='mt-3' />
                            </div>
                        ))
                    ) : (
                        <p>No payment history available.</p>
                    )}
                </div>
            </div>

            {/* Modal for Dispute Reason */}
            {showModal && (
                <div className="modal" tabIndex="-1" style={{ display: 'block',background:"#00000099" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Dispute Reason</h5>
                                <button type="button" className="btn-close shadow-none" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="disputeReason" className='fw-bold mb-2'>Reason for Dispute</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        id="disputeReason"
                                        value={disputeReason}
                                        onChange={(e) => setDisputeReason(e.target.value)}
                                        placeholder="Enter reason for dispute"
                                    />
                                </div>
                                <div className='text-end mt-3'>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleSubmitDispute}
                                    disabled={!disputeReason.trim()}>
                                    Submit Dispute
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
