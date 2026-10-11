"use client"
import { createContext, useState } from "react";
import {
  CreateOrder,
  Order,
  OrderStructure,
  updateOrder,
} from "../types/order.types";
import { childrenType } from "../types/common.types";
import orderService from "../services/order.service";
import axios from "axios";
export const OrderContext = createContext<OrderStructure | undefined>(
  undefined,
);

const OrderProvider = ({ children }: childrenType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order | null>(null);

  const createOrder = async (data: CreateOrder) => {
    try {
      setLoading(true);
      setError(null);
      const result = await orderService.createOrder(data);
      setOrders((prev) => [result, ...prev]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(
          err.response?.data?.message || "Order creation are failed!",
        );
        setError("Order creation are failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await orderService.getOrder();
      setOrder(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Order not found!");
        setError("Order not found!");
      }
    } finally {
      setLoading(false);
    }
  };

  const allOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await orderService.allOrders();
      setOrders(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Orders not found!");
        setError("Orders not found!");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, updateStatus: updateOrder) => {
   try{
    setLoading(true)
    setError(null)
     const result = await orderService.updateStatus(id, updateStatus);
    setOrders((prev) => prev.map((o) => (o._id === id ? result : o)));
   }catch(err){
    if(axios.isAxiosError(err)){
        console.log(err.response?.data?.message || "Status updation failed!")
    }
    setError("Status updation failed!")
   }finally{
    setLoading(false)
   }
  };
  const value: OrderStructure = {
    loading,
    error,
    createOrder,
    updateStatus,
    getOrder,
    allOrders,
    order,
    orders
  };
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export default OrderProvider;
