import axios, {  type AxiosInstance } from "axios";

export const  api:AxiosInstance = axios.create({

    baseURL:'http://127.0.0.1:8000/api',
    headers:{
        "Content-Type": 'application/json' 
    
    }
});