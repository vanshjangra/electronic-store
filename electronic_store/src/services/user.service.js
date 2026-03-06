import { publicAxios } from "./axios.service"

export const registerUser = (userData) => {
    return publicAxios.post(`/users`, userData).then((response) => response.data);
}

export const loginUser = (loginData) => {
    return publicAxios.post(`/auth/login`, loginData).then((response) => response.data);
};