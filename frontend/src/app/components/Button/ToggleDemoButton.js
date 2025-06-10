import { getAllEmp } from "@/app/api/employeeApi";
import React, { useState, useEffect, useContext } from "react";
import { updateLead } from "@/app/api/leadApi";
import { UserContext } from "@/app/context/UserContext";
import { MainAdminContext } from "@/app/context/AdminContext";

const ToggleDemoButton = ({ id, index, demoBy, disable, isDemonstrated, onToggle }) => {
  const [showDropdown, setShowDropdown] = useState(isDemonstrated); // Show dropdown only if demonstrated is true
  const [selectedDemoBy, setSelectedDemoBy] = useState(demoBy || ""); // Set initial value of selectedDemoBy from demoBy prop
  const [trainerOptions, setTrainerOptions] = useState([]); // State to store trainers
  const {state} = useContext(UserContext)
  const {adminState} = useContext(MainAdminContext)

  const handleToggle = () => {
    const newIsDemonstrated = !isDemonstrated;
    onToggle(newIsDemonstrated); // Notify parent component about the toggle

    if (!newIsDemonstrated) {
      // Update "Demo by" to an empty string when isDemonstrated is false
      if(!adminState.token)
      updateLead(state,id, { "Demo by": "" });
    else
    updateLead(adminState,id, { "Demo by": "" });
      setSelectedDemoBy(""); // Reset local state
    }

    setShowDropdown(newIsDemonstrated); // Show dropdown when set to true
  };

  const handleDemoByChange = (e) => {
    const value = e.target.value;
    setSelectedDemoBy(value);
    // Update the "Demo by" directly within this component using the imported updateLead function
    if(!adminState.token)
    updateLead(state,id, { "Demo by": value });
  else
  updateLead(adminState,id, { "Demo by": value });
  };

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        let employees
      if(!adminState.token)
         employees = await getAllEmp(state); // Fetch all employees
        else
        employees = await getAllEmp(adminState); // Fetch all employees
        const trainers = employees.filter((emp) => emp.Role === "TRNR"); // Filter employees with role TRNR
        setTrainerOptions(trainers);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    if (showDropdown) {
      fetchTrainers(); // Fetch data only when dropdown is shown
    }
  }, [showDropdown]);

  // Update selectedDemoBy whenever the demoBy prop changes (e.g., when updated by parent)
  useEffect(() => {
    setSelectedDemoBy(demoBy || "");
  }, [demoBy]);

  return (
    <span className="d-flex justify-content-center">

{showDropdown && (
        <select
          className="form-select shadow-none rounded-0"
          id={`Demo-By-${index}`}
          value={selectedDemoBy}
          onChange={handleDemoByChange}
          disabled={disable}
        >
          <option value="" disabled>
            Select
          </option>
          {trainerOptions.map((trainer) => (
            <option key={trainer._id} value={trainer["First Name"]}>
              {trainer["First Name"]}
            </option>
          ))}
        </select>
      )}

      <button
        className={`btn ${isDemonstrated ? "btn-outline-danger px-1" : "btn-outline-secondary w-100"} rounded-0`}
        title={`${isDemonstrated?"Remove Demo":"Add Demo"}`}
        disabled={disable}
        onClick={handleToggle}
      >
        {isDemonstrated ? "|" : "Not Yet"}
      </button>

 
    </span>
  );
};

export default ToggleDemoButton;
