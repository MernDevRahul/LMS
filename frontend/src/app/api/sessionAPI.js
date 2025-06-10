import { API } from "@/utils/Utils";
import toast from "react-hot-toast";
//-----------------------------------------------------------------------------------------
export const createSession = async (state, body) => {
    try {
        API.interceptors.request.use((req) => {
            req.headers.authorization = `Bearer ${state.token}`;
            return req;
        });

        const response = await API.post("/api/session/createSession", body);
        console.log(response)
        return response;
    } catch (error) {
      
        const errorMessage = error?.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage);
    }
};
