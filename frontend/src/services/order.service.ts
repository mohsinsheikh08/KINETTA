import api from "../libs/api";
import { AllOrders, CreateOrder, Order, updateOrder } from "../types/order.types";

const orderService = {
  createOrder: async (data: CreateOrder): Promise<Order> => {
    const response = await api.post<Order>("/order/create-order", data);
    return response.data;
  },
  getOrder : async (): Promise<Order> => {
    const response = await api.get<Order>("/order/get-order");
    return response.data
  },
  allOrders : async (): Promise<AllOrders> => {
    const response = await api.get<AllOrders>('/order/all-orders');
    return response.data
  },
  updateStatus : async (id: string, status: updateOrder): Promise<Order> => {
    const response = await api.patch(`/order/${id}`, status);
    return response.data
  }
};

export default orderService