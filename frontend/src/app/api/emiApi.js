import { API } from "@/utils/Utils";
//-----------------------------------------------------------------------------------------
export async function createEmi(state,body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.post('/api/emi/create', body)
        console.log("EMI Added Successfully", response.data);
        return response.status;  // Return the response in case you need to handle it
    } catch (error) {
        console.error("Error adding EMI:", error);
    }
}
//-----------------------------------------------------------------------------------------
export async function getAllEmi(state) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.get('/api/emi/getEmis')
        // Ensure that the response is an array
        return response.data.data?.EMI || [];
    } catch (error) {
        console.error("Error fetching EMIs:", error);
        return []; // Return an empty array in case of error
    }
}
//-----------------------------------------------------------------------------------------
export async function getEmi(state,query) {
    API.interceptors.request.use((req)=>{
        req.headers.authorization=`bearer ${state?.token}`
        return req;
      })
    const reqEmi = await API.get(`/api/emi/getEmi/?leadId=${query.leadId}`)
    // console.log(reqEmi.data?.exists);
    return reqEmi.data?.exists
}
//-----------------------------------------------------------------------------------------
export async function updateEmi(state,id, body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.put(`/api/emi/updateEmi/${id}`, body)
        console.log("EMI Updated Successfully", response.data);
        return response.status; // Return the updated EMI data
    } catch (error) {
        console.error("Error updating EMI:", error);
        throw error;
    }
}
//-----------------------------------------------------------------------------------------
export async function deleteEmi(state,id) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.delete(`/api/emi/deleteEmi/${id}`)
        console.log("EMI Deleted Successfully:", response.data);
        return response.status; // Optionally, return the response
    } catch (error) {
        console.error("Error deleting EMI:", error);
        throw error; // Re-throw error for handling in the calling component
    }
}