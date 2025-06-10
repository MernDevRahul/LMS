"use client";
import { useContext, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { MainAdminContext } from "@/app/context/AdminContext";
import toast from "react-hot-toast";
import { createRemark } from "@/app/api/remarkApi";

export default function RemarkSectionForm({lead, StdById, onClick }) {
  const [formData, setFormData] = useState({
    leadId: StdById?StdById.leadId : lead._id ||"",
    message: ""
  });
  const {state} = useContext(UserContext)
  const {adminState} = useContext(MainAdminContext)

    async function handleSubmit(body){
        try {
            const status = !adminState?.token ? await createRemark(state,body) : await createRemark(adminState,body)
            if(status==200){
                onClick();
            }
            toast.success('Remark added successfully!')
        } catch (error) {
            console.log(error);
        }
    }

  return (
      <>
        <h5>Remark :</h5>
        <div className="col-12 mb-3">
          <label htmlFor="message" className="form-label">Message:</label>
          <input
            type="text"
            id="message"
            name="remark"
            className="form-control shadow-none"
            value={formData.message}
            onChange={(e)=>{
                setFormData((prev)=>{
                    return{...prev,message:e.target.value}
                })
            }}
            placeholder="Enter Message"    
          />
        </div>
  
        <div className="col-12 mb-3">
          <button type="button" className="btn btn-success" onClick={()=>{handleSubmit(formData)}}
          disabled={!formData.message.length>0 ?true:false}
          >
            Add Remark
          </button>
        </div>
      </>
    );
  }
  