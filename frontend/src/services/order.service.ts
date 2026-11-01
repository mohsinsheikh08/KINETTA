import api from "../libs/api";
import {
  AllOrders,
  CreateOrder,
  Order,
  updateOrder,
} from "../types/order.types";

const orderService = {
  createOrder: async (data: CreateOrder): Promise<Order> => {
    const response = await api.post<Order>("/order/create-order", data);
    return response.data;
  },
  getOrder: async (): Promise<Order> => {
    const response = await api.get<Order>("/order/get-order");
    return response.data;
  },
  allOrders: async (): Promise<AllOrders> => {
    const response = await api.get("/order/all-orders");

    if (response.data && Array.isArray(response.data.allOrders)) {
      return response.data.allOrders;
    }

    if (response.data && Array.isArray(response.data.orders)) {
      return response.data.orders;
    }

    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  },
  updateStatus: async (id: string, status: updateOrder): Promise<Order> => {
    const response = await api.patch(`/order/${id}`, status);
    return response.data;
  },
};

export default orderService;
