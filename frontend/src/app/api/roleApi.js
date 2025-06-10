import toast from "react-hot-toast";
import { API } from "@/utils/Utils";
//----------------------------------------------------------------------------------------- 
export async function createRole(state,body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.post('/api/role/create', body)
        // console.log(response);
        const data = await response.data;
        if(data.error){
            throw new Error(data.error)
        }
        
        console.log("Role Added Successfully", response.data);
        return response.status;  // Return the response in case you need to handle it
    } catch (error) {
        toast.error(error.response.data);
    }
}
//-----------------------------------------------------------------------------------------
export async function getAllRole() {
    try {
        const response = await API.get('/api/role/getRoles')
        // Ensure that the response is an array
        return response.data.data?.Roles || [];
    } catch (error) {
        console.error("Error fetching Roles:", error);
        return []; 
    }
}
//-----------------------------------------------------------------------------------------   
export async function updateRole(state,id, body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })

        const response = await API.put(`/api/role/updateRole/${id}`, body)
        console.log("Role Updated Successfully", response.data);
        return response.status;
        
    } catch (error) {
        console.error("Error updating Role:", error);
        throw error;
    }
}
//-----------------------------------------------------------------------------------------
export async function deleteRole(state,id) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.delete(`/api/role/deleteRole/${id}`)
        console.log("Role Deleted Successfully:", response);
        return response.status; // Optionally, return the response
    } catch (error) {
        console.error("Error deleting Role:", error);
        throw error; // Re-throw error for handling in the calling component
    }
}
