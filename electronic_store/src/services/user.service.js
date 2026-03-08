import { privateAxios, publicAxios } from "./axios.service"

export const registerUser = (userData) => {
    return publicAxios.post(`/users`, userData).then((response) => response.data);
}

export const loginUser = (loginData) => {
    return publicAxios.post(`/auth/login`, loginData).then((response) => response.data);
};

export const getUser = (userId) => {
    return publicAxios.get(`/users/${userId}`).then((response) => response.data);
}

export const updateUser = (user) => {
    return privateAxios.put(`/users/${user.userId}`, user).then((response) => response.data);
}