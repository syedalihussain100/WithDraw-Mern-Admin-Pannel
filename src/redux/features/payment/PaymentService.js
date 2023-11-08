import axios from "axios";
import { config } from "../../../utils/axiosConfig";




// get all payment data


// getAllusers
const getAllPaymentData = async (userData) => {
    const response = await axios.get("http://localhost:4000/api/payment/alldata", config);

    return response?.data;
};

// getdetails
const getPaymentDetails = async (id) => {
    const response = await axios.get(`http://localhost:4000/api/payment/${id}`, config);

    return response?.data;
};

// video upload

const videoUpload = async (formData) => {
    const response = await axios.post('http://localhost:4000/api/video/upload', formData, config, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data
}

// get videos
const getVideos = async (formData) => {
    const response = await axios.get('http://localhost:4000/api/video/get-videos', config);

    return response.data
}


// get videos id
const getVideoId = async (id) => {
    const response = await axios.get(`http://localhost:4000/api/video/get-video/${id}`, config);

    return response.data
}


// delete video
const deleteVideoId = async (id) => {
    const response = await axios.delete(`http://localhost:4000/api/video/delete-video/${id}`, config);

    return response.data
}





export const paymentService = {
    getAllPaymentData,
    getPaymentDetails,
    videoUpload,
    getVideos,
    getVideoId,
    deleteVideoId
}