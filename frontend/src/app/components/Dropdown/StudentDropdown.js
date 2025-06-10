import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { getAllStd } from "@/app/api/studentApi";
import { UserContext } from "@/app/context/UserContext";
import { MainAdminContext } from "@/app/context/AdminContext";

export default function StudentDropdown({ onStudentSelect }) {
    const { adminState } = useContext(MainAdminContext);
    const { state } = useContext(UserContext);
    const [options, setOptions] = useState([]);
    
    useEffect(() => {
        async function fetchStudents() {
            try {
                const students = [...(!adminState.token ? await getAllStd(state) : await getAllStd(adminState))];

                const formattedOptions = students.map(user => ({
                    value: user._id,
                    label: `${user.Name} | ${user.Phone}`
                }));

                setOptions(formattedOptions);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        }

        fetchStudents();
    }, [state, adminState?.token]);

    return (
        <Select
            options={options}
            isSearchable
            onChange={(selectedOption) => onStudentSelect(selectedOption.value)}
        />
    );
}
    