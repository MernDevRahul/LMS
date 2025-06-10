import { API } from "@/utils/Utils";

//-----------------------------------------------------------------------------------------
export const createBatches = async (state,body)=>{
    try {
      console.log(body)  
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state.token}`
            return req;
          })
          const response = await API.post('/api/batch/create',body)
          // console.log("body")
          return response
    } catch (error) {
        console.log(error)
    }
}

//-----------------------------------------------------------------------------------------
export const GetAllBatches = async (state, page, limit) => {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${state.token}`;
      return req;
    });

    const response = await API.get('/api/batch/getAll', {
      params: { page, limit },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

//-----------------------------------------------------------------------------------------
export async function getAllBatchforSearch(state) {  
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.get('/api/batch/getBatchforSearch');
    // Ensure that the response is an array
    return response.data.data.batches || [];
  } catch (error) {
    return []; // Return an empty array in case of error
  }
}

//-----------------------------------------------------------------------------------------
export async function updateBatch(state,id, body) {
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.put(`/api/batch/updateBatch/${id}`, body);
    // console.log("Batch Updated Successfully", response.data);
    return response.status; // Return the updated Batch data
  } catch (error) {
    // console.error("Error updating Batch:", error);
    throw error;
  }
}

//-----------------------------------------------------------------------------------------
export async function deleteBatch(state,id) {
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.delete(`/api/batch/deleteBatch/${id}`);
    return response.status; // Optionally, return the response
  } catch (error) {
    throw error; // Re-throw error for handling in the calling component
  }
}