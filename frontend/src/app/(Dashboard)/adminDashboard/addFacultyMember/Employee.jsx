"use client";
import dynamic from "next/dynamic";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { getAllEmp } from "@/app/api/employeeApi";

import { MainAdminContext } from "@/app/context/AdminContext";
import { EmployeeContext } from "@/app/context/EmployeeContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Loader from "@/app/components/common/Loader";
import CreateEmployeeForm from "@/app/components/Form/CreateEmployeeForm";
import CustomModal from "@/app/components/modal/CustomModal";
import ModalButton from "@/app/components/Button/CustomModalBtn";
import RoleTable from "@/app/components/table/RoleTable";

const EmployeeTable = dynamic(() => import('@/app/components/table/EmployeeTable'), {
  loading: () => <Loader/>  , // Optionally show a loading spinner or message
  ssr: false, // Optional: Disable SSR if you don't need server-side rendering
});


export default function EmployeePage() {
  const { adminState } = useContext(MainAdminContext);
  const { employeeDispatch } = useContext(EmployeeContext);
  const router = useRouter();

  async function fetchEmployee() {
    let data;
    try {
      data = await getAllEmp(adminState);
      if (data) {
        employeeDispatch({
          type: "GET_EMPLOYEE",
          payload: data,
        });
      }
    } catch (error) {
      toast.error("Error fetching roles.");
      console.error("Error fetching roles:", error);
    } finally {
    }
  }

  useEffect(() => {
    fetchEmployee();
  }, []);

  useEffect(() => {

    if (!adminState?.token) {
      router.push('/administratorLogin');
    }
  }, [adminState?.token, router]);

  const [isModalOpen, setModalOpen] = useState({
    addFaculty: false,
    viewRoles: false,
  });

  const handleOpenModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: true })); // Open specific modal
  const handleCloseModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: false })); // Close specific modal

  return (
    <Suspense fallback={<Loader/>}>
            {/* Buttons to trigger modals */}
            <div className="d-flex justify-content-end">
              <ModalButton handleClick={() => handleOpenModal("addFaculty")}>
                <i className="bi bi-person-add"></i> Add Faculty
              </ModalButton>

              <div className="ps-2">
                <ModalButton
                  handleClick={() => handleOpenModal("viewRoles")}
                  className="ms-2" >
                  <i className="bi bi-eye"></i> View Roles
                </ModalButton>
              </div>
            </div>

            <div className="mt-4">
              <EmployeeTable
                onClose={() => handleCloseModal("addFaculty")}
                fetchEmployee={fetchEmployee}
              />
            </div>

            {/* Add Faculty Modal */}
            <CustomModal
              id="addFaculty"
              isVisible={isModalOpen.addFaculty}
              onClose={() => handleCloseModal("addFaculty")}
              title="Add Faculty"
              scrollable={"modal-dialog-scrollable"}
            >
              <CreateEmployeeForm
                fetchEmployee={fetchEmployee}
                onClose={() => handleCloseModal("addFaculty")}
              />
            </CustomModal>

            {/* View Details Modal */}
            <CustomModal
              id="viewRoles"
              isVisible={isModalOpen.viewRoles}
              onClose={() => handleCloseModal("viewRoles")}
              title="View Roles"
              scrollable={"modal-dialog-scrollable"}
            >
              <RoleTable />
            </CustomModal>
    </Suspense>
  );
}
