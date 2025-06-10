import React, { useContext, useEffect, useState } from 'react';
import PaymentSectionForm from '../Form/PaymentSectionForm';

import { getPaymentByEmiId } from '@/app/api/paymentApi';
import { UserContext } from '@/app/context/UserContext';
import { MainAdminContext } from '@/app/context/AdminContext';

export default function EmiDropdownModal({ StdById,idx }) {
  const [showModal, setShowModal] = useState(false);        // State for controlling modal visibility
  const [emiData, setEmiData] = useState([]);               // State for storing EMI data
  const [payment, setPayment] = useState([]);
  const [toggleButton, setToggleButton] = useState(false);  // State for toggling 'Hello'
  
  const {state} = useContext(UserContext)
  const{adminState} = useContext(MainAdminContext)

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        let paymentData
        if(!adminState.token)
         {
          paymentData = await getPaymentByEmiId(state,StdById.EmiId); // Fetch payment data using the correct prop
        setPayment(paymentData);
         }else{
          paymentData = await getPaymentByEmiId(adminState,StdById.EmiId); // Fetch payment data using the correct prop
        setPayment(paymentData);
         }
        // Initialize emiData based on the fetched payment data
        const initialEmiData = paymentData.map(() => ({
          amount: '',
          date: '',
          showPaymentSection: false,
        }));
        setEmiData(initialEmiData);
        // console.log(paymentData);
      } catch (error) {
        console.error("Error fetching payment: ", error);
      }
    };

    if (StdById.EmiId) {  // Check if EmiId is valid before fetching
      fetchPayment();
    }
  }, [StdById]);  // Added StdById as a dependency to refetch on prop change

  // Handle EMI field change
  const handleEMIChange = (e, index) => {
    const updatedEMIData = [...emiData];
    updatedEMIData[index].amount = e.target.value;
    setEmiData(updatedEMIData);
  };

  // Handle date field change
  const handleDateChange = (e, index) => {
    const updatedEMIData = [...emiData];
    updatedEMIData[index].date = e.target.value;
    setEmiData(updatedEMIData);
  };

  // Save EMI changes
  const saveEMIChanges = () => {
    // Handle saving logic (e.g., API call, saving to state, etc.)
    console.log('Saving EMI changes:', emiData);
    setShowModal(false);
  };

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

  return (
    <div className="emi-inputs">
      <div className="dropdown d-flex justify-content-between w-100">
        <button
          className="btn btn-primary text-start shadow-none rounded-0 border-0 w-100"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {
            payment ? payment.reduce((sum, pay) => {
              return sum + Number(pay.amount);
            }, 0) : "Total EMI Amount"
          }
        </button>
        <ul className="dropdown-menu w-100" 
        aria-labelledby="dropdownMenuButton"
        style={{minWidth:"260px"}}
        >
          <li>
            {
              payment ? payment.map((pay, idx) => (
                <button key={idx} className="dropdown-item d-flex justify-content-between" type="button">
                  <span>{pay?.amount}</span> <span>{formatDate(pay?.createdAt)}</span>
                </button>
              )) :
                null
            }
          </li>
          <li>
            <button className="dropdown-item" type="button" onClick={() => setShowModal(true)}>
              Add EMI
            </button>
          </li>
        </ul>
      </div>

      {/* Add EMI Modal */}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        tabIndex="-1"
        style={{ display: showModal ? 'block' : 'none',background:"#00000099" }}
        aria-labelledby="addEMIModalLabel"
        {...(showModal ? {} : { inert: true })} // Add inert when the modal is hidden
      >

        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addEMIModalLabel">
                Payment Section
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {payment.map((pay, index) => (
                <div key={index} className="row mb-3 text-start">
                  <div className="col-6">EMI {index + 1}</div>
                  <div className="col-6">Paid on</div>
                  <div className="col-6">
                    <input
                      type="text"
                      id={`Amount-${index}${idx + 1}`}
                      className="form-control border shadow-none p-2"
                      value={pay?.amount || ''}
                      onChange={(e) => handleEMIChange(e, index)}
                      placeholder={`Enter EMI ${index + 1}`}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      id={`TimeStamp-${index}${idx + 1}`}
                      className="form-control border shadow-none p-2"
                      value={formatDate(pay?.createdAt) || ''}
                      onChange={(e) => handleDateChange(e, index)}
                    />
                  </div>
                </div>
              ))}

              <div className='text-end'>
                {/* Toggle Hello Button */}
                <button className="btn btn-link px-0" onClick={() => setToggleButton(!toggleButton)}>
                  {!toggleButton ? "Add Another Payment"
                    : (<>
                      <i className="bi bi-x-lg fs-5 text-danger"></i>
                    </>)}
                </button>

              </div>
              {/* Conditionally render Hello */}
              {toggleButton &&
                <div className='row'>
                  <PaymentSectionForm
                    FromStd={StdById._id}
                    CourseFee={StdById.Fee}
                  />
                </div>
              }
            </div>

          </div>
        </div>
      </div>
      {/* End Modal */}
    </div>
  );
}
