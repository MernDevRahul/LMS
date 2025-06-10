import { io } from "socket.io-client";
import { config } from "./config";
import { PROD } from "./constants";

export const socket=new io(config.CURRENT_ENV==PROD?process.env.NEXT_PUBLIC_API_URL_PROD:process.env.NEXT_PUBLIC_API_URL_DEV,{
    autoConnect:false
})
