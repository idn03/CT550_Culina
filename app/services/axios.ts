import axios from "axios";

export const API_BASE_URL = "http://192.168.1.17:8000";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

export const connectToAIServer = async () => {
    try {
        const response = await axiosInstance.get('/');
        console.log(response);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};