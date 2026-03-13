import {privateAxios} from './axios.service';

export const getAllOrders = async (pageNumber, pageSize, sortBy, sortDir) => {
    let result = await privateAxios.get(`/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
    return result.data;
};