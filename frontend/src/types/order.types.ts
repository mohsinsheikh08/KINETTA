import { cartItems, User } from "./cart.types";

export interface CreateOrder {
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  emergencyNumber: string;
  number: string;
  notes?: string;
}

type validStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface updateOrder {
  status: validStatus;
}

type paymentMethod = "COD";
export interface Order extends CreateOrder {
  _id: string;
  user: User;
  items: cartItems[];
  totalAmount: number;
  status: validStatus;
  paymentMethod: paymentMethod;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type AllOrders = Order[]


export interface OrderStructure {
  loading: boolean,
  error: null| string,
  createOrder : (data: CreateOrder) => Promise<void>;
  getOrder : () => Promise<void>;
  allOrders : () => Promise<void>;
  updateStatus : (id: string, status : updateOrder) => Promise<void>;
  order: Order | null;
  orders: Order[]
}