"use client";
import { useContext, useState } from 'react';
import { createStd } from '@/app/api/studentApi';
import toast from 'react-hot-toast';
import { UserContext } from '@/app/context/UserContext';
import { MainAdminContext } from '@/app/context/AdminContext';
import CourseMultipleDropdown from '../Dropdown/CourseMultipleDropdown';

export default function DirectAdmissionForm({ lead, index, updateLeadData, onClose }) {
    const { state } = useContext(UserContext)
    const { adminState } = useContext(MainAdminContext)


    const [formData, setFormData] = useState({
        // "Lead by": lead?.["Lead by"] || "",
        // "Demo by": lead?.["Demo by"] || "",
        // Name: lead?.["Name"] || "",
        // Phone: lead?.["Phone"] || "",
        // "Email id": lead?.["Email id"] || "",
        // Course: lead?.["Course"] || "",
        // Fee: lead?.["Fee"] || "",
        // Remark: "Click to See Remark",
        // DOA: new Date().toISOString().split("T")[0],
        // DOJ: new Date().toISOString().split("T")[0],
        // EmiId: lead?.EmiId || "",
        // Password: `${lead?.["Name"].toUpperCase().substring(0, 4)}${lead?.["Phone"].slice(-4)}` || "",
        // leadId: lead?._id
    });

    // Handle changes in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Capitalize the first letter of the value
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setFormData({
            ...formData,
            [name]: capitalizedValue, // Update with the capitalized value
        });
    };

    const handleCourseSelectionChange = (selectedCourses) => {
        const totalFee = selectedCourses.reduce((sum, course) => sum + (course["Course Fee"] || 0), 0);
        setFormData({
            ...formData,
            Course: selectedCourses.map((course) => course._id),
            Fee: totalFee,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // try {
        //     let newLead
        //     if (!adminState.token)
        //         newLead = await createStd(state, formData);
        //     else
        //         newLead = await createStd(adminState, formData);
        //     console.log(newLead);
        //     toast.success('"Lead added successfully!"')

        //     if (newLead) {
        //         setFormData({
        //             "Lead by": "",
        //             "Demo by": "",
        //             Name: "",
        //             Phone: "",
        //             "Email id": "",
        //             Course: [],
        //             Fee: 0,
        //             DOA: "",
        //             DOJ: "",
        //             EmiId: "",
        //             Password: "",
        //             Remark: "",
        //         });
        //     }
        //     onClose();
        //     toast.success("Admission Done Successfully.")
        // } catch (error) {
        //     console.error("Error submitting form:", error);
        //     toast.error("Failed to add lead. Please try again.")
        // }
    };

    return (
        <div className="container-fluid w-100">

            <form onSubmit={handleSubmit}>
                <div className="row">

{/* =================Personal Details==================== */}

                    {/* Student's Name Field */}
                    <div className="col-12 col-sm-4 mb-3">

                        <label htmlFor="Admission-Name" className="form-label">Student Name:</label>
                        <input
                            type="text"
                            id="Admission-Name"
                            name="Name"
                            className="form-control shadow-none"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Student's Phone Field */}
                    <div className="col-12 col-sm-4 mb-3">
                        <label htmlFor="Admission-Phone" className="form-label">Student Phone:</label>
                        <input
                            type="text"
                            id="Admission-Phone"
                            name="Phone"
                            className="form-control shadow-none"
                            value={formData.Phone}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Enter your phone number"
                            maxLength={15}
                        />
                    </div>

                    {/* Father's Name Field */}
                    <div className="col-12 col-sm-4 mb-3">

                        <label htmlFor="Father-Name" className="form-label">Father's Name / Husband's Name:</label>
                        <input
                            type="text"
                            id="Father-Name"
                            name="FatherName"
                            className="form-control shadow-none"
                            value={formData.FatherName}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Enter Father's name"
                        />
                    </div>

                    {/* Mother's Name Field */}
                    <div className="col-12 col-sm-4 mb-3">

                        <label htmlFor="Mother-Name" className="form-label">Mother's Name:</label>
                        <input
                            type="text"
                            id="Mother-Name"
                            name="MotherName"
                            className="form-control shadow-none"
                            value={formData.MotherName}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Enter Mother's name"
                        />
                    </div>

                    {/* Email ID Field */}
                    <div className="col-12 col-sm-4 mb-3">
                        <label htmlFor="Admission-EmailId" className="form-label">Email ID:</label>
                        <input
                            type="email"
                            id="Admission-EmailId"
                            name="Email id"
                            className="form-control shadow-none"
                            // value={formData["Email id"].toLowerCase()}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* DOB Field */}
                    <div className="col-12 col-sm-4 mb-3">

                        <label htmlFor="DOB" className="form-label">DOB</label>
                        <input
                            type="date"
                            id="DOB"
                            name="DOB"
                            className="form-control shadow-none"
                            value={formData.DOB}
                            // onChange={handleChange}
                            required
                            autoComplete="off"
                        />

                    </div>

{/* =================Personal Details==================== */}
{/* =================Address Details==================== */}

                    <div className="col-12">
                        <b>Address : </b>
                    </div>

                    {/* Residence Field */}
                    <div className="col-12 col-sm-4 mb-3">

                        <label htmlFor="Residence" className="form-label">Appartment no. / House no. / Flat no.</label>
                        <input
                            type="text"
                            id="Residence"
                            name="Residence"
                            className="form-control shadow-none"
                            value={formData.Residence}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Enter Appartment no / House no. / Flat no."
                        />
                    </div>

                    {/* Street Field */}
                    <div className="col-12 col-sm-4 mb-3">

                        <label htmlFor="Street" className="form-label">Street</label>
                        <input
                            type="text"
                            id="Street"
                            name="Street"
                            className="form-control shadow-none"
                            value={formData.Street}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Eg. 24, D Block"
                        />

                    </div>

                    {/* City Field */}
                    <div className="col-12 col-sm-4 mb-3">

                        <label htmlFor="City" className="form-label">City</label>
                        <input
                            type="text"
                            id="City"
                            name="City"
                            className="form-control shadow-none"
                            value={formData.City}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Eg. New Delhi"
                        />

                    </div>

                    {/* State Field */}
                    <div className="col-12 col-sm-4 mb-3">

                        <label htmlFor="State" className="form-label">State</label>
                        <input
                            type="text"
                            id="State"
                            name="State"
                            className="form-control shadow-none"
                            value={formData.State}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Eg. Delhi"
                        />

                    </div>

                    {/* Postcode Field */}
                    <div className="col-12 col-sm-4 mb-3">

                        <label htmlFor="PostalCode" className="form-label">PostalCode</label>
                        <input
                            type="text"
                            id="PostalCode"
                            name="PostalCode"
                            className="form-control shadow-none"
                            value={formData.PostalCode}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Eg. 110030"
                        />

                    </div>

                    {/* Country Field */}
                    <div className="col-12 col-sm-4 mb-3">

                        <label htmlFor="Country" className="form-label">Country</label>
                        <input
                            type="text"
                            id="Country"
                            name="Country"
                            className="form-control shadow-none"
                            value={formData.Country}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Eg. India"
                        />

                    </div>

{/* =================Address Details==================== */}
{/* =================Course Details==================== */}

                    {/* Course Dropdown */}
                    <div className="col-12 col-sm-4 mb-3">
                        <p className="form-label">Course:</p>
                        <div className='border'>
                            <CourseMultipleDropdown
                                indexId={`CourseDropdownForm-${index}`}
                                studentCourses={formData.Course}
                                onSelectionChange={handleCourseSelectionChange}
                            />
                        </div>
                    </div>

                    {/* Fee Field */}
                    <div className="col-12 col-sm-4 mb-3">
                        <label htmlFor="Admission-Fee" className="form-label">Fee:</label>
                        <input
                            type="text"
                            id="Admission-Fee"
                            name="Fee"
                            className="form-control shadow-none"
                            value={formData.Fee || ""} // Ensures controlled component
                            onChange={(e) => {
                                const updatedFee = e.target.value;
                                setFormData((prevData) => ({ ...prevData, Fee: updatedFee })); // Update local state
                                updateLeadData(lead._id, { Fee: updatedFee }); // Update backend
                            }}
                            placeholder="Total Fee"
                        />
                    </div>

                    {/* DOJ Field */}
                    <div className="col-12 col-sm-4 mb-3">
                        <label htmlFor="DOJ" className="form-label">Date of Joining:</label>
                        <input
                            type="date"
                            id="DOJ"
                            name="DOJ"
                            className="form-control shadow-none"
                            value={formData.DOJ || new Date().toISOString().split("T")[0]} // Default to today's date if DOJ is not set
                            onChange={(e) => {
                                const selectedDate = e.target.value; // Directly use the input value
                                setFormData((prevData) => ({ ...prevData, DOJ: selectedDate })); // Update local state
                                updateLeadData(lead._id, { DOJ: selectedDate }); // Update the backend
                            }}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="col-12 col-sm-4 mb-3">
                        <label htmlFor="Admission-Password" className="form-label">Password:</label>
                        <input
                            type="text"
                            id="Admission-Password"
                            name="Password"
                            className="form-control shadow-none text-success border border-success"
                            value={formData.Password}
                            onChange={handleChange}
                            readOnly
                            placeholder="Enter a password"
                        />
                    </div>

                </div>

                <div className="col-6 col-sm-6 mb-3">
                    <button type="submit" className="btn btn-success w-100">Register</button>
                </div>

            </form>
        </div>
    );
}