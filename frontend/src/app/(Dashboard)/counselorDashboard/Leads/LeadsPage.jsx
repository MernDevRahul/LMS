"use client";
import React, { useState, useEffect, useContext, Suspense } from "react";

import { getAllLead, updateLead } from "@/app/api/leadApi";
import { getAllPayment } from "@/app/api/paymentApi";
import { getAllStd } from "@/app/api/studentApi";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { UserContext } from "@/app/context/UserContext";
import { LeadContext } from "@/app/context/LeadContext";
import { PaymentContext } from "@/app/context/PaymentContext";
import { StudentContext } from "../../../context/StudentContext";
import { MainAdminContext } from "@/app/context/AdminContext";

import Loader from "@/app/components/common/Loader";
import CustomModal from "@/app/components/modal/CustomModal";
import ModalButton from "@/app/components/Button/CustomModalBtn";
import CreateLeadForm from "@/app/components/Form/CreateLeadForm";
import NotificationButton from "@/app/components/Button/NotificationButton";

const LeadTable = dynamic(() => import("@/app/components/table/LeadTable"), {
  loading: () => <Loader/>, // Optionally, show a loading state
  ssr: false, // Optional: Disable SSR if the component only works on the client side
});

export default function LeadsPage() {
  // =========== Context =================================
  const { leadData, leadDispatch } = useContext(LeadContext);
  const { paymentData, paymentDispatch } = useContext(PaymentContext);

  const { studentDispatch } = useContext(StudentContext);
  const { state } = useContext(UserContext);
  const { adminState } = useContext(MainAdminContext);

  // ================ States =======================================
  const [followUpTodayCount, setFollowUpTodayCount] = useState(0);
  const [filterByToday, setFilterByToday] = useState(false);
  const router = useRouter();

  // ======= Modal & Loading =======================================
  const [isModalOpen, setModalOpen] = useState({
    addLead: false,
    viewDetails: false,
  });


  // =============== HandleModals =========================================================================================================
  const handleOpenModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: true }));
  const handleCloseModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: false }));

  // ============ Fetching Data ===================================================================================================================

  // Combine all fetch operations into one function
  async function fetchAllData() {
    try {
      const token = adminState?.token ? adminState : state;
      // Execute all fetches in parallel
      const [leadResponse, paymentResponse, studentResponse] =
        await Promise.all([
          getAllLead(token),
          getAllPayment(token),
          getAllStd(token),
        ]);

      if (leadResponse) {
        leadDispatch({
          type: "GET_LEAD",
          payload: leadResponse,
        });
      }

      if (paymentResponse) {
        paymentDispatch({
          type: "GET_PAYMENT",
          payload: paymentResponse,
        });
      }

      if (studentResponse) {
        studentDispatch({
          type: "GET_STUDENT",
          payload: studentResponse,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const calculateFollowUpToday = React.useCallback(() => {
    const count = leadData?.filter((lead) => {
      const followUpDate = lead["Follow-Up Date"]?.split("T")[0];
      const Condition = lead["Admission Status"];
      return (
        Condition !== "Wrong No" &&
        Condition !== "Not Interested" &&
        Condition !== "Done" &&
        isFollowUpTodayOrEarlier(followUpDate)
      );
    }).length;
    setFollowUpTodayCount(count);
  }, [leadData, filterByToday]);

  function handleFollowUpFilter() {

    if (!filterByToday) {
      try {
        const todayFollowUps = leadData.filter((lead) => {
          const followUpDate = lead["Follow-Up Date"]?.split("T")[0];
          const Condition = lead["Admission Status"];
          return (
            Condition !== "Wrong No" &&
            Condition !== "Not Interested" &&
            Condition !== "Done" &&
            isFollowUpTodayOrEarlier(followUpDate)
          );
        });
        leadDispatch({
          type: "GET_LEAD",
          payload: todayFollowUps,
        });
      } catch (error) {
        console.log(error);
      } finally {
      }
    } else {
      fetchAllData(); // Reset to first page when clearing filter
    }
    setFilterByToday(!filterByToday);
  }

  const isFollowUpTodayOrEarlier = (followUpDate) => {
    const today = new Date().toISOString().split("T")[0];
    return followUpDate && followUpDate <= today;
  };

  const handleCourseSelectionChange = async (id, index, selectedCourses) => {
    // If selectedCourses is valid and contains 'fee', the following will work
    const updatedLeads = [...leadData];
    const totalFee = selectedCourses.reduce(
      (sum, course) => sum + (course["Course Fee"] || 0),
      0
    );

    updatedLeads[index].Course = selectedCourses.map(
      (course) => course.Abbreviation
    );
    updatedLeads[index].Fee = totalFee;
    // Call your update function to sync with backend or state management
    const status = updateLeadData(id, {
      Course: selectedCourses.map((course) => course.Abbreviation),
      Fee: totalFee,
    });
    if (status == 200) {
      const data = await getAllLead();
      if (data) {
        leadDispatch({
          type: "GET_LEAD",
          payload: data
        })
      }
    }
  };

  const updateLeadData = async (leadId, updatedData) => {
    try {
      // Make the API call to update the lead
      if (!adminState.token) await updateLead(state, leadId, updatedData);
      else await updateLead(adminState, leadId, updatedData);
    } catch (error) {
      console.error("Error updating lead data:", error);
    }
  };


  // Optimize useEffects
  useEffect(() => {
    fetchAllData();
  }, []); // Run only once on mount

  useEffect(() => {
    calculateFollowUpToday();
  }, [leadData, paymentData, calculateFollowUpToday]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!state.token) {
        router.push("/"); // Redirect to dashboard if logged in        
      }
    }
  }, [state?.token, router]);

  return (
    <Suspense fallback={<Loader/>}>
      {/* Button to trigger the modal */}
      <div className="d-flex justify-content-start">
        <ModalButton handleClick={() => handleOpenModal("addLead")} onClose={() => handleCloseModal("addLead")}>
          <i className="bi bi-file-earmark-spreadsheet-fill"></i> New Lead
        </ModalButton>
          <NotificationButton
            Label={filterByToday ? "All Lead" : "Follow-Up"}
            NotificationCount={filterByToday ? 0 : followUpTodayCount}
            onClick={handleFollowUpFilter}
          />
      </div>

      <div className="mt-3">
        
          <LeadTable
            fetchStudent={fetchAllData}
            // leads={leadData} // Use leadData directly
            handleCourseSelectionChange={handleCourseSelectionChange}
            totalItems={leadData?.length || 0}
          />
      </div>

      {/* Modal component */}
      <CustomModal
        id="addLead"
        isVisible={isModalOpen.addLead}
        onClose={() => handleCloseModal("addLead")}
        title="Add New Lead"
        scrollable={"modal-dialog-scrollable"}
      >
        <CreateLeadForm
          fetchLead={fetchAllData}
          onClose={() => handleCloseModal("addLead")}
        />
      </CustomModal>
    </Suspense>
  );
}