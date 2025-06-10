"use client";
import React, { useState, useEffect, useContext, Suspense } from "react";
import dynamic from "next/dynamic";

import { getAllStd } from "@/app/api/studentApi";
import { getAllPayment } from "@/app/api/paymentApi";

import { PaymentContext } from "@/app/context/PaymentContext";
import { MainAdminContext } from "@/app/context/AdminContext";
import { StudentContext } from "../../../context/StudentContext";
import { UserContext } from "@/app/context/UserContext";

import Loader from "@/app/components/common/Loader";
import NotificationButton from "@/app/components/Button/NotificationButton";
import StudentAdmissionForm from "@/app/components/Form/StudentAdmissionForm";
import ModalButton from "@/app/components/Button/CustomModalBtn";
import CustomModal from "@/app/components/modal/CustomModal";
import DirectAdmissionForm from "@/app/components/Form/DirectAdmissionForm";

const StudentTable = dynamic(() => import("@/app/components/table/StudentTable"), {
  loading: () => { <Loader /> },  // You can display a loading message or spinner here
  ssr: false,
});

const StudentPaymentVerificationTable = dynamic(() => import("@/app/components/table/StudentPaymentVerifcationTable"), {
  loading: () => { <Loader /> },  // You can display a loading message or spinner here
  ssr: false,
});

export default function NewAdmission() {
  const { state } = useContext(UserContext);
  const { adminState } = useContext(MainAdminContext);
  const { studentDispatch } = useContext(StudentContext);
  const { paymentData, paymentDispatch } = useContext(PaymentContext);
  const [PaymentToggler, setPaymentToggler] = useState(false);
  const [notVerifiedCount, setNotVerifiedCount] = useState(0);
  const [isModalOpen, setModalOpen] = useState({
    addLead: false,
    viewDetails: false,
  });


  async function fetchAllData() {
    try {
      let studentResponse = adminState.token == "undefined" ?
        await getAllStd(state) : await getAllStd(adminState);

      let paymentResponse = adminState.token == "undefined" ?
        await getAllPayment(state) : await getAllPayment(adminState);


      if (studentResponse) {
        studentDispatch({
          type: "GET_STUDENT",
          payload: studentResponse
        })
      }

      if (paymentResponse) {
        paymentDispatch({
          type: "GET_PAYMENT",
          payload: paymentResponse,
        });
      }

    } catch (error) {
      console.log(error);
    }
  }

  // Memoize the calculation functions
  const countNotVerifiedLeads = React.useCallback(() => {
    if (!paymentData) return 0;

    return paymentData.filter(payment => {
      const isNotVerified = payment.isVerified === "Not Verified"
      return isNotVerified;
    }).length;
  }, [paymentData]);

  useEffect(() => {

    fetchAllData();
  }, [])

  useEffect(() => {

    setNotVerifiedCount(countNotVerifiedLeads());
  }, [countNotVerifiedLeads])

  // =============== HandleModals =========================================================================================================
  const handleOpenModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: true }));
  const handleCloseModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: false }));

  return (
    <Suspense fallback={<Loader />}>
      {/* Button to trigger the modal */}
      <div className="d-flex justify-content-start">
        <ModalButton handleClick={() => handleOpenModal("StudentAdmission")} onClose={() => handleCloseModal("addLead")}>
          <i className="bi bi-file-earmark-spreadsheet-fill"></i> New Admission
        </ModalButton>

        <NotificationButton
          Label={PaymentToggler ? "All Students" : "Payment Verification"}
          onClick={() => setPaymentToggler(!PaymentToggler)}
          NotificationCount={PaymentToggler ? 0 : notVerifiedCount}
        />
      </div>

      <div className="mt-3">
        {PaymentToggler ? (
          <StudentPaymentVerificationTable />
        ) : (
          <StudentTable />
        )}
      </div>

      {/* Modal component */}
      <CustomModal
        id="StudentAdmission"
        isVisible={isModalOpen.StudentAdmission}
        onClose={() => handleCloseModal("StudentAdmission")}
        title="Student Admission"
        scrollable={"modal-dialog-scrollable"}
      >
        <DirectAdmissionForm
          // fetchLead={fetchAllData}
          onClose={() => handleCloseModal("StudentAdmission")}
        />
      </CustomModal>

    </Suspense>
  )
}
