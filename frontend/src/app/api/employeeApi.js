import { API } from "@/utils/Utils";
import toast from "react-hot-toast";
//-----------------------------------------------------------------------------------------
export async function createEmp(state,body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.post('/api/employee/create', body)
        console.log("Employee Added Successfully", response.data);
        return response.status;  // Return the response in case you need to handle it
    } catch (error) {
        console.error("Error adding Employee:", error);
    }
}
//-----------------------------------------------------------------------------------------
export async function getAllEmp(state) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.get('/api/employee/getEmployees')
        // Ensure that the response is an array        
        return response.data.data?.Employees || [];
    } catch (error) {
        // console.error("Error fetching Employees:", error);
        toast.error("Error")
        return []; // Return an empty array in case of error
    }
}
//-----------------------------------------------------------------------------------------
// export async function getEmp() {
//     const reqEmp = await axios.get('http://localhost:8000/employee/getEmployee')
//     console.log(reqEmp.data.data);
// }
//-----------------------------------------------------------------------------------------
export async function updateEmp(state,id, body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.put(`/api/employee/updateEmployee/${id}`, body)
        // console.log("Employee Data Update Successfully", response.data);
        return response.status; // Return the updated Employee data
    } catch (error) {
        console.error("Error updating Employee:", error);
        throw error;
    }
}
//-----------------------------------------------------------------------------------------
export async function deleteEmp(state,id) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.delete(`/api/employee/deleteEmployee/${id}`)
        console.log("Employee Data Deleted Successfully:", response.data);
        return response.status; // Optionally, return the response
    } catch (error) {
        console.error("Error deleting Employee:", error);
        throw error; // Re-throw error for handling in the calling component
    }
}
//-----------------------------------------------------------------------------------------
export async function LoginEmployee(){
    try {
        const response = await API.post('/api/employee/LoginEmployee')
        return response.status
    } catch (error) {
        console.log("Login error :",error)
    }
}
