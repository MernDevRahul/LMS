"use client";
import { useContext, useState } from "react";
import { createPayment } from "@/app/api/paymentApi";
import { UserContext } from "@/app/context/UserContext";
import { MainAdminContext } from "@/app/context/AdminContext";
import toast from "react-hot-toast";

export default function PaymentSectionForm({ FromStd, FromLead, CourseFee }) {
  const [formData, setFormData] = useState({
    FromLead: FromLead,
    FromStd: FromStd,
    amount: "",
    payerName: "",
    MOP: "",
    platform: "",
  });
  const {state} = useContext(UserContext)
  const {adminState} = useContext(MainAdminContext)
  const handleSubmit = ()=>{
    if(
      formData.amount.length>0      &&
      formData.payerName.length>0   &&
      formData.MOP.length>0
    ){
      // alert("yes")
      createTransition()
    }
    else{
      alert("Please fill the Fields !")
    }
  }

  const createTransition = async () => {
    // console.log(CourseFee);
    // console.log(formData);
    
    try {
      let newPayment
      const paymentData = {
        leadId:formData.FromLead,
        studentId: formData.FromStd,
        amount: formData.amount,
        payerName: formData.payerName,
        MOP: formData.MOP,
        platform: formData.platform,
      };
      if(!adminState.token)
       newPayment = await createPayment(state,paymentData);
      else
      newPayment = await createPayment(adminState,paymentData);


      if (newPayment && newPayment._id) {
        // After successful payment, call handleUpdate to update DOJ and EMI
        handleUpdate(formData.leadId, newPayment._id); // Pass paymentId to update EMI
      }

      // console.log("Payment successful:", newPayment);
      toast.success("Payment Added Successfully")
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);


    } catch (error) {
      console.error("Payment error:", error);
      toast.error('Payment failed. Please try again.')
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
      <>
        <h5>Payment :</h5>
        <div className="col-12 col-sm-6 mb-3">
          <label htmlFor="Amount" className="form-label">Amount:</label>
          <input
            type="text"
            id="Amount"
            name="amount"
            className={`form-control shadow-none ${ Number(formData.amount)>Number(CourseFee)?"border-danger":""}`}
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter Payable Amount"    
          />
        </div>
  
        <div className="col-12 col-sm-6 mb-3">
          <label htmlFor="Payer" className="form-label">Payer:</label>
          <input
            type="text"
            id="Payer"
            name="payerName"
            className="form-control shadow-none"
            value={formData.payerName}
            onChange={handleChange}
            placeholder="Enter Payer Name"  
          />
        </div>
  
        <div className="col-12 col-sm-6 mb-3">
          <label htmlFor="Payment-Mode" className="form-label">Mode:</label>
          <select className="form-select shadow-none"
            id="Payment-Mode"
            name="MOP"
            value={formData.MOP}
            onChange={handleChange}
            required   
          >
            <option value="">Mode of Payment</option>
            <option value="Cash">Cash</option>
            <option value="Online Payment">Online Payment</option>
          </select>
        </div>
  
        <div className="col-12 col-sm-6 mb-3">
          <label htmlFor="Payment-Platform" className="form-label">Platform:</label>
          <select
            className="form-select shadow-none"
            id="Payment-Platform"
            name="platform"
            value={formData.platform || ""}
            onChange={handleChange}
            disabled={formData.MOP!=="Online Payment"?true:false}
            required
          >
            <option value="">Payment Platform</option>
            <option value="PhonePe">PhonePe</option>
            <option value="Google Pay">Google Pay</option>
            <option value="Paytm">Paytm</option>
            <option value="BHIM UPI">BHIM UPI</option>
            <option value="Amazon Pay">Amazon Pay</option>
            <option value="Others">Others</option>
          </select>
        </div>
  
        <div className="col-12 col-sm-6 mb-3">
          <button type="button" className="btn btn-success" onClick={handleSubmit}
          disabled={ 
            Number(formData.amount)>Number(CourseFee)||
            (formData.amount.length<=0 &&
              formData.payerName.length<=0 &&
              formData.MOP.length<=0
            )?true:false}
          >
            {FromLead?"Verify Payment":"Add Payment"}
          </button>
        </div>
      </>
    );
  }
  