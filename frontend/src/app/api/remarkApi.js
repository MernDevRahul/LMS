import { API } from "@/utils/Utils";
//-----------------------------------------------------------------------------------------
export async function createRemark(state,body){
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req
        })
        const respond = await API.post("/api/remark/createRemark",body)
        return respond.status;
    } catch (error) {
        console.log(error);
    }
}
//-----------------------------------------------------------------------------------------
export async function getRemarkById(id) {
    try {
        // API.interceptors.request.use((req)=>{
        //     req.headers.authorization=`bearer ${state?.token}`
        //     return req;
        // })
        const respond = await API.get(`/api/remark/getRemark/${id}`)
        return respond.data
        
    } catch (error) {
        console.log(error);   
    }   
}
//-----------------------------------------------------------------------------------------
export async function updateRemark(state,id,body) {
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${state?.token}`
            return req;
        })
        const response = await API.put(`/api/remark/updateRemark/${id}`,body);
        return response.status;
        
    } catch (error) {
        console.log(error);
    }
}