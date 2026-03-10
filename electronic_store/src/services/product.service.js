import {privateAxios} from "./axios.service"

export const createProductWithoutCategory = (product) => {
    return privateAxios.post(`/products`, product).then((response) => response.data);
};

export const createProductInCategory = (product, categoryId) => {
    return privateAxios.post(`/categories/${categoryId}/products`, product).then((response) => response.data);
};