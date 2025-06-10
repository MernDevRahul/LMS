import { API } from "@/utils/Utils";
//-----------------------------------------------------------------------------------------
export async function createCourse(state,body) {
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.post('/api/course/create', body);
    return response.status;  // Return the response in case you need to handle it
  } catch (error) {
    console.error("Error adding course:", error);
  }
}
//-----------------------------------------------------------------------------------------
export async function getAllCourse(state) {  
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.get('/api/course/getCourses');
    // Ensure that the response is an array
    return response.data.data?.course || [];
  } catch (error) {
    return []; // Return an empty array in case of error
  }
}
//-----------------------------------------------------------------------------------------
// export async function getCourse() {
//     const reqCourse = await axios.get('http://localhost:8000/course/getCourse')
//     console.log(reqCourse.data.data);
// }
//-----------------------------------------------------------------------------------------
export async function updateCourse(state,id, body) {
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.put(`/api/course/updateCourse/${id}`, body);
    // console.log("Course Updated Successfully", response.data);
    return response.status; // Return the updated course data
  } catch (error) {
    // console.error("Error updating course:", error);
    throw error;
  }
}
//-----------------------------------------------------------------------------------------
export async function deleteCourse(state,id) {
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.delete(`/api/course/deleteCourse/${id}`);
    // console.log("Course Deleted Successfully:", response.data);
    return response.status; // Optionally, return the response
  } catch (error) {
    // console.error("Error deleting course:", error);
    throw error; // Re-throw error for handling in the calling component
  }
}