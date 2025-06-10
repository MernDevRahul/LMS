import { API } from "@/utils/Utils";
//-----------------------------------------------------------------------------------------
export async function createPayment(state,body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.post('/api/payment/create', body)
        console.log("Payment Added Successfully", response.data);
        return response.status;  // Return the response in case you need to handle it
    } catch (error) {
        console.error("Error adding Payment:", error);
    }
}
//-----------------------------------------------------------------------------------------
export async function getAllPayment(state) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.get('/api/payment/getPayments')
        // Ensure that the response is an array
        
        return response.data;
    } catch (error) {
        // console.error("Error fetching Payments:", error);
        return []; // Return an empty array in case of error
    }
}
//-----------------------------------------------------------------------------------------
export async function getPayment(state,query) {
    API.interceptors.request.use((req)=>{
        req.headers.authorization=`bearer ${state?.token}`
        return req;
      })
    const reqPayment = await API.get(`/api/payment/getPayment/?leadId=${query.leadId}`)
    // console.log(reqPayment.data?.exists);
    return reqPayment.data?.payment
}
//-----------------------------------------------------------------------------------------
export async function getPaymentByEmiId(state,id){
    API.interceptors.request.use((req)=>{
        req.headers.authorization=`bearer ${state?.token}`
        return req;
      })
    const payment = await API.get(`/api/payment/getPaymentById/${id}`)
    return payment.data
    
}
//-----------------------------------------------------------------------------------------
export async function updatePayment(state,id, body) {
    // console.log('student :',state);
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.put(`/api/payment/updatePayment/${id}`, body)
        // console.log("Payment Updated Successfully", response.data);
        return response.status; // Return the updated Payment data
    } catch (error) {
        console.error("Error updating Payment:", error);
        throw error;
    }
}
//-----------------------------------------------------------------------------------------
export async function deletePayment(state,id) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
          })
        const response = await API.delete(`/api/payment/deletePayment/${id}`)
        console.log("Payment Deleted Successfully:", response.data);
        return response.status; // Optionally, return the response
    } catch (error) {
        console.error("Error deleting Payment:", error);
        throw error; // Re-throw error for handling in the calling component
    }
}