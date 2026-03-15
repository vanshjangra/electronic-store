import {privateAxios} from "./axios.service"

export const createProductWithoutCategory = (product) => {
    return privateAxios.post(`/products`, product).then((response) => response.data);
};

export const createProductInCategory = (product, categoryId) => {
    return privateAxios.post(`/categories/${categoryId}/products`, product).then((response) => response.data);
};

export const addProductImage = (file, productId) => {
    const formData = new FormData();
    formData.append("productImage", file);
    return privateAxios.post(`/products/image/${productId}`, formData).then((response) => response.data);
};

export const getAllProducts = (pageNumber = 0, pageSize = 10, sortBy = 'addedDate', sortDir = 'asc') => {
    return privateAxios.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
    .then((response) => response.data);
};

export const getAllLive = (pageNumber = 0, pageSize = 10, sortBy = 'addedDate', sortDir = 'asc') => {
    return privateAxios.get(`/products/live?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
    .then((response) => response.data);
};

export const deleteProduct = (productId) => {
    return privateAxios.delete(`/products/${productId}`).then((response) => response.data);
};

export const updateProduct = (product, productId) => {
    return privateAxios.put(`/products/${productId}`, product).then((response) => response.data);
};

export const updateProductCategory = (categoryId, productId) => {
    return privateAxios.put(`/categories/${categoryId}/products/${productId}`).then((res) => res.data);
};

export const searchProduct = (query) => {
    return privateAxios.get(`/products/search/${query}`).then((res) => res.data);
};

export const getProduct = (productId) => {
    return privateAxios.get(`/products/${productId}`).then((res) => res.data);
};