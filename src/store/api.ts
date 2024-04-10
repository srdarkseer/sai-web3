import axios from "axios";

const baseURL = "http://52.45.51.160:8000/api/v1";

const api = axios.create({
  baseURL,
});

export const generateData = async (formData: any) => {
  try {
    const response = await api.post("/data/generate", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
