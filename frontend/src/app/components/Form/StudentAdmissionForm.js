"use client";
import { useContext, useEffect, useState } from 'react';
import { createStd } from '@/app/api/studentApi';    
import { getAllPayment } from '@/app/api/paymentApi';
import { getEmi } from '@/app/api/emiApi';
import toast from 'react-hot-toast';
import { UserContext } from '@/app/context/UserContext';
import { MainAdminContext } from '@/app/context/AdminContext';
import PaymentSectionForm from './PaymentSectionForm';
import CourseMultipleDropdown from '../Dropdown/CourseMultipleDropdown';

export default function StudentAdmissionForm({ lead, index, updateLeadData, onClose }) {
  const {state} = useContext(UserContext) 
  const {adminState} = useContext(MainAdminContext) 
  const [isVerified, setIsVerified] = useState(lead?.isVerified);
  const [payment,setPayment]  =useState([])

  const [isEmiExist, setIsEmiExist] = useState(false)

  const [formData, setFormData] = useState({
    "Lead by": lead?.["Lead by"] || "",
    "Demo by": lead?.["Demo by"] || "",
    Name: lead?.["Name"] || "",
    Phone: lead?.["Phone"] || "",
    "Email id": lead?.["Email id"] || "",
    Course: lead?.["Course"] || "",
    Fee: lead?.["Fee"] || "",
    Remark: "Click to See Remark",
    DOA: new Date().toISOString().split("T")[0],
    DOJ: new Date().toISOString().split("T")[0],
    EmiId: lead?.EmiId || "",
    Password: `${lead?.["Name"].toUpperCase().substring(0, 4)}${lead?.["Phone"].slice(-4)}` || "",
    leadId: lead?._id
  });

  useEffect(() => {
    const fetchData = async () => {
      let payments
      let data
      if(!adminState.token){
        payments = await getAllPayment(state);
        data = await getEmi(state,{ leadId: lead?._id })
      }  
      else{
        payments = await getAllPayment(adminState);
        data = await getEmi(adminState,{ leadId: lead?._id })
      }
     
      setIsEmiExist(data)
      setPayment(payments || []); // Ensure it's always an array
    }
    fetchData()

    setIsVerified(lead?.isVerified);
  }, [lead]);

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
      Course: selectedCourses.map((course) => course.Abbreviation),
      Fee: totalFee,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let newLead
      if(!adminState.token)
       newLead = await createStd(state,formData);
      else
      newLead = await createStd(adminState,formData);
      console.log(newLead);
      toast.success('"Lead added successfully!"')

      if (newLead) {
        setFormData({
          "Lead by": "",
          "Demo by": "",
          Name: "",
          Phone: "",
          "Email id": "",
          Course: [],
          Fee: 0,
          DOA: "",
          DOJ: "",
          EmiId: "",
          Password: "",
          Remark: "",
        });
      }
      onClose();
      toast.success("Admission Done Successfully.")
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add lead. Please try again.")
    }
  };

  return (
    <div className="container-fluid w-100">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-sm-4 mb-3">
            <label htmlFor="Admission-Name" className="form-label">Name:</label>
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

          {isVerified==="Verified" && (
            <>
              <div className="col-12 col-sm-4 mb-3">
                <label htmlFor="Admission-Phone" className="form-label">Phone:</label>
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

              <div className="col-12 col-sm-4 mb-3">
                <label htmlFor="Admission-EmailId" className="form-label">Email ID:</label>
                <input
                  type="email"
                  id="Admission-EmailId"
                  name="Email id"
                  className="form-control shadow-none"
                  value={formData["Email id"].toLowerCase()}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Enter your email"
                />
              </div>

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
            </>
          )}


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
    disabled={isEmiExist} // Simplified conditional logic
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




          {isVerified ==="Not Verified" && (
            !isEmiExist ?
              <PaymentSectionForm
                FromLead={lead._id}
                CourseFee={formData.Fee}
                handleChange={handleChange}
              /> :
              <div className='d-flex'>
              <h5 className='text-warning me-2 mb-0'>Payment Verification Pending</h5>
              <i className="bi bi-clock-history text-warning" style={{padding:"2px 0"}}></i>
              </div>
          )}
          {isVerified ==="Under Review" && (
              <div className='d-flex'>
              <h5 className='text-danger me-2 mb-0'>Under Review</h5>
              <i className="bi bi-clock-history text-danger" style={{padding:"2px 0"}}></i>
              </div>
          )}

          {isVerified==="Verified" && (
            <>
              <div className="col-12 col-sm-4 mb-3">
                <label htmlFor="Admission-leadBy" className="form-label">Lead By:</label>
                <input
                  type="text"
                  id="Admission-leadBy"
                  name="Lead by"
                  className="form-control shadow-none"
                  value={formData["Lead by"]}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Enter lead source"
                />
              </div>

              {/* Demo by Field */}
              <div className="col-12 col-sm-4 mb-3">
                <label htmlFor="Admission-demoBy" className="form-label">Demo By:</label>
                <input
                  type="text"
                  id="Admission-demoBy"
                  name="Demo by"
                  className="form-control shadow-none"
                  value={formData["Demo by"]}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Enter Demo Giver"
                />
              </div>

              {/* EMI Field */}
              <div className="col-12 col-sm-4 mb-3">
                <label htmlFor="Admission-EMI" className="form-label">EMI:</label>
                <input
                  type="text"
                  id="Admission-EMI"
                  name="EMI"
                  className="form-control shadow-none"
                  value={
                    payment?.length > 0
                      ? payment.find((pay) => pay.EmiId === lead.EmiId)?.amount || "No Payment"
                      : "Loading..."
                  }
                  readOnly
                  placeholder="Shown EMI"
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

              {/* Remark Field */}
              <div className="col-12 col-sm-8 mb-3">
                <label htmlFor="Admission-Remark" className="form-label">Remark:</label>
                <input
                  type="text"
                  id="Admission-Remark"
                  name="Remark"
                  className="form-control shadow-none"
                  value={formData.Remark}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Enter your remark"
                />
              </div>

            </>)}
        </div>

        {isVerified==="Verified" && (
          <div className="col-6 col-sm-6 mb-3">
            <button type="submit" className="btn btn-success w-100">Register</button>
          </div>
        )}
      </form>
    </div>
  );
}