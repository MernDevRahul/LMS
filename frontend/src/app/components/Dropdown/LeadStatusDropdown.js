import React, { useContext, useEffect, useState } from "react";
import StudentAdmissionForm from "../Form/StudentAdmissionForm";
import CustomModal from "../modal/CustomModal";
import { getEmi } from '@/app/api/emiApi';
import { UserContext } from "@/app/context/UserContext";
import { MainAdminContext } from "@/app/context/AdminContext";

const LeadStatusDropdown = ({
  disable,

  index,
  lead,
  admissionStatus,
  onUpdateStatus,
  updateLeadData,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isEmiExist, setIsEmiExist] = useState(false)
  const {state} = useContext(UserContext) 
  const {adminState} = useContext(MainAdminContext) 

  const handleItemClick = (status) => {
    // Call the parent's update status handler
    onUpdateStatus(status);
    // console.log(lead);
    
    // Automatically close the dropdown after selection
    const dropdownToggle = document.querySelector('[data-bs-toggle="dropdown"]');
    if (dropdownToggle) {
      dropdownToggle.click();
    }

    // Open the modal if the "Done" status is selected
    if (status === "Done") {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

    useEffect(() => {
      const fetchData = async () => {
        let data
        if(!adminState.token){
          data = await getEmi( state,{ leadId: lead._id })
        }else{
          data = await getEmi( adminState,{ leadId: lead._id })
        }
        setIsEmiExist(data)
      }
      fetchData()

    }, [lead]);

  return (
    <div>
      <div className="dropdown">
        <button
          className={`btn ${
            admissionStatus === "Done"
              ? "btn-success"
              : admissionStatus === "Interested"
              ? "btn-warning"
              : admissionStatus === "Not Interested"
              ? "btn-secondary"
              : admissionStatus === "Wrong No"
              ? "btn-danger"
              : "btn-outline-secondary"
          } dropdown-toggle w-100 rounded-0`}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          disabled={disable}
        >
          {
          disable===true? 
          "Registered"
          :
          lead.isVerified==="Under Review" && isEmiExist && admissionStatus==="Done"?
          "Under Review"
          :
          lead.isVerified==="Not Verified" && isEmiExist && admissionStatus==="Done"?
          "Pending"
          :
          lead.isVerified==="Not Verified" && admissionStatus==="Done"?
          "Verify Payment"
          :
          lead.isVerified==="Verified" && isEmiExist && admissionStatus==="Done"?
          "Register"
          :
          admissionStatus || "No Status"
          }
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleItemClick("Done")}
            >
              {
            lead.isVerified==="Under Review" && isEmiExist && admissionStatus==="Done"?
            "Under Review"
            :
            lead.isVerified==="Not Verified" && admissionStatus!=="Done"?
            "Verify Payment"
            :
            lead.isVerified==="Not Verified" && isEmiExist && admissionStatus==="Done"?
            "Pending"
            :
            lead.isVerified==="Not Verified" && admissionStatus==="Done"?
            "Verify Payment"
            :
            lead.isVerified==="Verified" && isEmiExist && admissionStatus==="Done"?
            "Register"
            :
            "Done"
            }
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleItemClick("Interested")}
            >
              Interested
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleItemClick("Not Interested")}
            >
              Not Interested
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleItemClick("Wrong No")}
            >
              Wrong No
            </button>
          </li>
        </ul>
      </div>

      {/* Modal for Admission */}
      {showModal && (
        <CustomModal
          id={`modal-${index}`}
          isVisible={showModal}
          onClose={handleCloseModal}

          title={
            lead.isVerified==="Not Verified" && admissionStatus==="Done"?
            "Verify Student Payment"
            :
            lead.isVerified==="Verified" && admissionStatus==="Done"?
            "Register Student"
            :
            "Registration"}
        >
          {/* Pass necessary props from parent or state */}
          <StudentAdmissionForm lead={lead} index={index} updateLeadData={updateLeadData} onClose={handleCloseModal}/>
        </CustomModal>
      )}
    </div>
  );
};

export default LeadStatusDropdown;