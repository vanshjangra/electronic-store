import {privateAxios} from "./axios.service"

export const addCategory = (category) => {
    return privateAxios.post(`/categories`, category).then((response) => response.data);
};

export const getCategories = (currentPage = 0, pageSize = 10) => {
    return privateAxios.get(`/categories?pageNumber=${currentPage}&&pageSize=${pageSize}`).then((response) => response.data);
};

export const deleteCategory= (categoryId) => {
    return privateAxios.delete(`/categories/${categoryId}`).then((response) => response.data);
};

export const updateCategory = (category) => {
    return privateAxios.put(`/categories/${category.categoryId}`, category).then((response) => response.data);
};