import {privateAxios} from "./axios.service"

export const addCategory = (category) => {
    return privateAxios.post(`/categories`, category).then((response) => response.data);
};

export const getCategories = () => {
    return privateAxios.get(`/categories`).then((response) => response.data);
};

export const deleteCategory= (categoryId) => {
    return privateAxios.delete(`/categories/${categoryId}`).then((response) => response.data);
};

export const updateCategory = (category) => {
    return privateAxios.put(`/categories/${category.categoryId}`, category).then((response) => response.data);
};