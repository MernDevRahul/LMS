import { API } from "@/utils/Utils";
import toast from "react-hot-toast";
//-----------------------------------------------------------------------------------------
export async function createLead(state,body) {
  try {
    API.interceptors.request.use((req)=>{
    req.headers.authorization=`bearer ${state?.token}`
    return req;
  })
    const response = await API.post('/api/lead/create', body)
    // console.log("Lead Added Successfully", response);
    return response.status;  // Return the response in case you need to handle it
  } catch (error) {
    console.error("Error adding Lead:", error);
  }

}
//-----------------------------------------------------------------------------------------
export async function getAllLead(state) {  
  // console.log(state);
    
  try {
    API.interceptors.request.use((req)=>{      
      req.headers.authorization=`bearer ${state?.token}`      
      return req;
    })
    const response = await API.get('/api/lead/getLeads')
    // Ensure that the response is an array        
    return response.data.data.Leads || [];
  } catch (error) {
    // console.error("Error fetching Leads:", error);
    toast.error(error.response.data)
  }
}
//-----------------------------------------------------------------------------------------
export async function updateLead(state, id, body) {  
  try {
    if (!state?.token) {
      // console.log(state);
      throw new Error('Authentication token is missing');
    }

    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${state.token}`;
      return req;
    });

    const response = await API.put(`/api/lead/updateLead/${id}`, body);
    return response.status;
  } catch (error) {
    console.error("Error updating lead:", error);
    toast.error(error.message || 'Failed to update lead');
    throw error;
  }
}
//-----------------------------------------------------------------------------------------
export async function deleteLead(state,id) {
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.delete(`/api/lead/deleteLead/${id}`)
    console.log("Lead Deleted Successfully:", response.data);
    return response.status; // Optionally, return the response
  } catch (error) {
    console.error("Error deleting Lead:", error);
    throw error; // Re-throw error for handling in the calling component
  }
}