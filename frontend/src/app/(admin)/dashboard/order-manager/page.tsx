"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Search,
  Eye,
  CheckCircle,
  Truck,
} from "lucide-react";
import useOrder from "@/src/hooks/useOrder";
import Loading from "@/src/components/LandingComp/Loading";

const OrderManager = () => {
  const { allOrders, orders, updateStatus, loading } = useOrder();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (allOrders) allOrders();
  }, []);

  // Data Safety
  const ordersList = Array.isArray(orders) ? orders : [];

  const filteredOrders = ordersList.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleStatusChange = async (id: string, status: string) => {
    await updateStatus(id, { status: status });
    window.location.reload();
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#f7f7f5] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="p-2 bg-white border border-black/10 hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-black uppercase tracking-widest text-black">
              Order Manager
            </h1>
            <p className="text-neutral-500 text-sm">
              Manage customer orders and shipping status.
            </p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white border border-black/10 shadow-sm overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-black/10 bg-neutral-50/50">
            <div className="relative w-full max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by Order ID or Customer Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-black/20 outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-100 text-xs uppercase tracking-wider text-neutral-500 font-bold">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-neutral-50 transition-colors group"
                  >
                    <td className="px-6 py-4 font-semibold">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      {order.user?.firstName} {order.user?.lastName}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      Rs. {order.totalAmount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-neutral-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm
                        ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-neutral-100 text-neutral-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        value={order.status}
                        className="text-xs border border-black/20 p-1 outline-none focus:border-black bg-white cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="p-12 text-center text-neutral-500">
                No orders found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManager;
