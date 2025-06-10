import { useContext, useState } from 'react';
import CourseMultipleDropdown from '../Dropdown/CourseMultipleDropdown';
import { createLead } from '@/app/api/leadApi';
import toast from 'react-hot-toast';
import { UserContext } from '@/app/context/UserContext';
import { MainAdminContext } from '@/app/context/AdminContext';
import { LeadContext } from '@/app/context/LeadContext';
export default function CreateLeadForm({fetchLead, onClose}) {
  const { state } = useContext(UserContext)
  const { adminState } = useContext(MainAdminContext)
  const {leadDispatch} = useContext(LeadContext)
  

  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    "Email id": '',  // Change the key here to match the backend
    Course: [],
    Fee: 0,
    Remark: "Click to see Remark",  // Change the key here to match the backend
    "Lead by":  !adminState.token? state["First Name"]:adminState["First Name"], 
    isVisited: false,
    "Admission Status": "No Status",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCourseSelectionChange = (selectedCourses) => {
    const totalFee = selectedCourses.reduce((sum, course) => sum + (course["Course Fee"] || 0), 0); // Sum course fees
    setFormData({
      ...formData,
      Course: selectedCourses.map((course) => course._id), // Store only abbreviations
      Fee: totalFee, // Update total fee
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(formData.Name!="" && 
        formData.Phone!="" && 
        formData.Course!="" && 
        formData.Fee>0){
      let newLead = ""
      if (!adminState.token){
        newLead = await createLead(state, formData)
        if(newLead){
          leadDispatch({
            type:"CREATE_LEAD",
            payload:newLead
          })
        }
      }
      else{
        newLead = await createLead(adminState, formData)
        if(newLead){
          leadDispatch({
            type:"CREATE_LEAD",
            payload:newLead
          })
        }
      }
      toast.success('Lead added successfully!')
      if (newLead) {
        fetchLead()
        setFormData({
          Name: '',
          Phone: '',
          "Email id": '',
          Course: [],
          Fee: 0,
          Remark: '',
        });
      }
      onClose();
      }else{
        toast.error('Please fill the form!')
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      // alert('');
      toast.error('Failed to add lead. Please try again.')
    }
  };

  return (
    <div className="container-fluid w-100">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Name Field */}
          <div className="col-12 col-sm-6 mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              name="Name"
              className="form-control shadow-none"
              value={formData.Name}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Enter student name"
            />
          </div>

          {/* Email Field */}
          <div className="col-12 col-sm-6 mb-3">
            <label htmlFor="email" className="form-label">Email Id (optional)</label>
            <input
              type="email"
              id="email"
              name="Email id"  // Change name attribute to "Email id"
              className="form-control shadow-none"
              value={formData["Email id"].toLowerCase()}  // Accessing using the correct key
              onChange={handleChange}
              required={false}
              autoComplete="off"
              placeholder="Enter student email (optional)"
            />
          </div>

          {/* Phone Field */}
          <div className="col-12 col-sm-6 mb-3">
            <label htmlFor="phone" className="form-label">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="Phone"
              className="form-control shadow-none"
              placeholder="Enter your phone number"
              value={formData.Phone}
              onChange={handleChange}
              maxLength={15}
              autoComplete="off"
              required
            />
          </div>

          {/* Course Dropdown */}
          <div className="col-12 col-sm-6 mb-3">
            <p className="form-label">Course:</p>
            <CourseMultipleDropdown
              uniqueId="CourseDropdownForm-1"
              studentCourses={formData.Course} // Pass selected abbreviations
              onSelectionChange={handleCourseSelectionChange}
            />
          </div>

          {/* Remark Field */}
          {/* <div className="col-12 col-sm-6 mb-3">
            <label htmlFor="remark" className="form-label">Remark:</label>
            <input
              type="text"
              id="remark"
              name="Remark"  // Change name attribute to "Remark"
              className="form-control shadow-none"
              value={formData.Remark}  // Accessing using the correct key
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Enter your remark"
            />
          </div> */}

          {/* Fee Field */}
          <div className="col-12 col-sm-6 mb-3">
            <label htmlFor="Fee" className="form-label">Fee:</label>
            <input
              type="text"
              id="Fee"
              name="Fee"
              className="form-control shadow-none"
              value={formData.Fee}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Total Fee"
              readOnly
            />
          </div>

          {/* Submit Button */}
          <div className="col-12 mb-3">
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
