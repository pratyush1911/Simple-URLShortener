

import axios from "axios";

export const exportInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});