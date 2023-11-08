import axios from "axios";
import { config } from "../../../utils/axiosConfig";


// login
const login = async (userData) => {
    const response = await axios.post("http://localhost:4000/api/user/admin", userData);

    if (response?.data) {
        localStorage.setItem("user", JSON.stringify(response?.data));
    }

    return response?.data;
};

// logout
const logout = async () => {
    const response = await axios.get("http://localhost:4000/api/user/logout");

    return response?.data;
};





// getAllusers
const getUsers = async (userData) => {
    const response = await axios.get("http://localhost:4000/api/user/allusers", config);

    return response?.data;
};


// update user active





export const authService = {
    login,
    getUsers,
    logout
}