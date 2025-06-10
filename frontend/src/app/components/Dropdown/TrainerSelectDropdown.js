import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { getAllEmp } from "@/app/api/employeeApi";
import { UserContext } from "@/app/context/UserContext";
import { MainAdminContext } from "@/app/context/AdminContext";

export default function TrainerDropdown({ onTrainerSelect }) {
    const { adminState } = useContext(MainAdminContext);
    const { state } = useContext(UserContext);
    const [options, setOptions] = useState([]);
    const [employeData, setEmployeeData] = useState({trainerid: "" });

    useEffect(() => {
        async function fetchOption() {
            let employees = [...(!adminState.token ? await getAllEmp(state) : await getAllEmp(adminState))];
            
            let formattedOptions = employees
                .filter(user => user.Role === "TRNR") 
                .map(user => ({
                    value: user._id,
                    label: `${user.Email} | ${user.Phone}`
                }));
            setOptions(formattedOptions);
        }

        fetchOption();
    }, []);

    // console.log(employeData)

    return (
        <Select
        value={options.find(option => option.value === 'Shadb@gmail.com')}
            options={options}
            isSearchable
            onChange={(selectedOption) => {
                const updatedTrainer = {trainerid: selectedOption.value }
                setEmployeeData(prev => ({...prev,...updatedTrainer }))
                onTrainerSelect(selectedOption.value)
            }}
            // isDisabled={!state || Object.keys(state).length !== 0}
            required
        />
    );
}
