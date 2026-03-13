import {privateAxios} from './axios.service';

export const getAllOrders = async () => {
    let result = await privateAxios.get(`/orders`);
    return result.data;
};