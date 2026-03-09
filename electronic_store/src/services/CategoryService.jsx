import {privateAxios} from "./axios.service"

export const addCategory = (category) => {
    return privateAxios.post(`/categories`, category).then((response) => response.data);
};

export const getCategories = () => {
    return privateAxios.get(`/categories`).then((response) => response.data);
};