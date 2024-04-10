import axios from "axios";

const baseURL = process.env.BASE_URL;

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
