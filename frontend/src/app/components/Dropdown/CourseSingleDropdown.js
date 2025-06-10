import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { getAllCourse } from "@/app/api/courseApi";
import { UserContext } from "@/app/context/UserContext";
import { MainAdminContext } from "@/app/context/AdminContext";

export default function CourseSingleDropdown({ onCourseSelect }) {
    const { adminState } = useContext(MainAdminContext);
    const { state } = useContext(UserContext);
    const [options, setOptions] = useState([]);
    const [ courseData,setCourseData] = useState({ courseId: "" });
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        async function fetchOption() {
            let courses = [...(!adminState.token ? await getAllCourse(state) : await getAllCourse(adminState))];
            
            let formattedOptions = courses.map(course => ({
                value: course._id,
                label: `${course["Abbreviation"]} | ${formatDuration(course)}`
            }));
            setOptions(formattedOptions);
        }

        fetchOption();
    }, [state, adminState]);

    function formatDuration(course) {
        if (course.DurationType === "Months") {
            return (course.Duration / 28) + " Months";
        } else if (course.DurationType === "Days") {
            return (course.Duration) + " Days";
        } else if (course.DurationType === "Years") {
            return (course.Duration / 365) + " Years";
        }
        return course.Duration + " Days";
    }
    
    return (
        <Select
            value={selectedOption}
            options={options}
            isSearchable
            onChange={(selectedOption) => {
                const updatedCourse = { courseId: selectedOption.value };  // Change to courseId
                setCourseData((prev) => ({ ...prev, ...updatedCourse }));
                setSelectedOption(selectedOption);  // Update the selected option
                onCourseSelect(selectedOption.value)
            }}
            required
        />
    );
}
