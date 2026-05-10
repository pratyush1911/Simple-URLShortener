import axios from "axios"
export const exportInstance = axios.create({
    baseURL : "http://localhost:3000"
})