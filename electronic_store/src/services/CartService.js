import { privateAxios } from "./axios.service"

export const getCart = async (userId) => {
    const res = await privateAxios.get(`/carts/${userId}`);
    return res.data;
};

export const addItemToCart = async (userId, productId, quantity) => {
    const res = await privateAxios.post(`/carts/${userId}`, {
        productId,
        quantity
    });
    return res.data;
};

export const clearCart = async (userId) => {
    const res = await privateAxios.delete(`/carts/${userId}`);
    return res.data;
};

export const removeItemFromCart = async (userId, itemId) => {
    const res = await privateAxios.delete(`/carts/${userId}/items/${itemId}`);
    return res.data;
};