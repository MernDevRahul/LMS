import { API } from "@/utils/Utils"
import toast from "react-hot-toast"
//-----------------------------------------------------------------------------------------
export const CoursesAssign= async (body)=>{
    try {
        const response = await API.post("/api/coursesAssign/assign-course",body)
        // console.log(response)
        return response
    } catch (error) {
        toast.error(error.response.data)
        // console.log()
    }
}