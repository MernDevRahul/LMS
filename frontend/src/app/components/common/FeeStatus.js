"use client"
import React, { useContext, useEffect, useState } from 'react'
import { getPaymentByEmiId } from '@/app/api/paymentApi';
import { StudentContext } from '@/app/context/StudentContext'
import { PaymentContext } from '@/app/context/PaymentContext';
import { StudentLoginContext } from '@/app/context/StudentLoginContext';

import StudentFeeHistory from './StudentFeeHistory';

export default function FeeStatus() {
  const { paymentData, paymentDispatch } = useContext(PaymentContext)
  const { studentData } = useContext(StudentContext)
  const { studentState } = useContext(StudentLoginContext)
  // const[totalAmount, SetTotalAmount] = useState()

  const formatDate = (isoDate) => {
    if (!isoDate) return ""; // "No Record"
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    // const hours = date.getHours() % 12 || 12;
    // const minutes = date.getMinutes().toString().padStart(2, "0");
    // const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${day}-${month}-${year}`; //${hours}:${minutes} ${ampm}
  };

  async function fetchData() {
    try {
      if (studentState.token) {
        const fetchPayment = await getPaymentByEmiId(studentState, studentData.EmiId)
        paymentDispatch({
          type: "GET_PAYMENT",
          payload: fetchPayment
        })
        // console.log(fetchPayment);

      } else {
        console.log("No Payment");
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchData();
    // SetTotalAmount(paymentData.reduce((sum, item) => sum + item.amount, 0))
  }, []);

  return (
    <div className="main-body">
      <div className="row gutters-sm mx-0">

        <div className="col-md-4 mb-3 px-0">
          <div className="card me-0 me-md-2" style={{ height: "237px" }}>
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">

                <div className="mt-4">
                  <p className="text-muted fs-5">Techstack Academy</p>
                  <h4 className="mt-4">{studentData.Name}</h4>
                  <p className="text-secondary mb-1">{studentData.Phone}</p>
                  <p className="text-secondary mb-1">{studentData['Email id']}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8 mb-5 px-0">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row mt-2">
                <div className="col-sm-5">
                  <h6 className="mb-0"><i className="bi bi-tags-fill me-2 fs-5"></i>Course Fee</h6>
                </div>
                <div className="col-sm-7 mt-md-0 mt-2 text-secondary">
                  {studentData?.Fee}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-5">
                  <h6 className="mb-0"><i className="bi bi-cash-coin me-2 fs-5"></i>Paid</h6>
                </div>
                <div className="col-sm-7 mt-md-0 mt-2" style={{ color: "green" }}>
                  {/* {
                    paymentData.reduce((sum, item) => sum + item?.amount, 0)
                  } */}
                  {paymentData?.length
                    ? paymentData.reduce((sum, item) => sum + (Number(item?.amount) || 0), 0)
                    : 0}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-5">
                  <h6 className="mb-0"><i className="bi bi-coin me-2 fs-5"></i>Balance</h6>
                </div>
                <div className="col-sm-7 mt-md-0 mt-2" style={{ color: "red" }}>
                  {studentData?.Fee - paymentData.reduce((sum, item) => sum + item?.amount, 0)}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-5">
                  <h6 className="mb-0"><i className="bi bi-calendar-month me-2 fs-5"></i>Admission Date</h6>
                </div>
                <div className="col-sm-7 mt-md-0 mt-2 text-secondary">
                  {formatDate(studentData?.DOA)}
                </div>
              </div>



            </div>
          </div>


        </div>

        <StudentFeeHistory />

      </div>
    </div>
  )
}