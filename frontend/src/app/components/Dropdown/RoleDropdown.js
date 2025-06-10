import { getAllRole } from "@/app/api/roleApi";
import { MainAdminContext } from "@/app/context/AdminContext";
import { RoleContext } from "@/app/context/RoleContext";
import React, { useEffect, useContext } from "react";
import toast from "react-hot-toast";

export default function RoleDropdown({ formData, handleChange }) {
  const { dispatch, roleData } = useContext(RoleContext);
  const { adminState } = useContext(MainAdminContext);

  async function fetchRole() {
    try {
      const data = await getAllRole();
      if (data) {
        if (adminState?.Role === "ADMIN") {
          dispatch({
            type: "GET_ROLE",
            payload: data,
          });
        } else {
          const filteredRoles = data.filter(
            (role) => role.Abbreviation !== "ADMIN"
          );
          dispatch({
            type: "GET_ROLE",
            payload: filteredRoles,
          });
        }
      }
    } catch (error) {
      toast.error("Error fetching roles.");
      console.error("Error fetching roles:", error);
    }
  }

  useEffect(() => {
    fetchRole();
  }, [adminState?.Role]);

  return (
    <div className="col-12 col-sm-6 mb-3">
      <label htmlFor="role" className="form-label">
        Role:
      </label>
      <select
        id="role"
        name="Role"
        className="form-select shadow-none"
        value={formData || ""}
        onChange={handleChange}
        required
        autoComplete="off"
      >
        <option value="" disabled>
          Select a role
        </option>
        {Array.isArray(roleData) &&
          roleData?.map((role) => (
            <option key={role._id} value={role.Abbreviation}>
              {role.Position}
            </option>
          ))}
      </select>
    </div>
  );
}
