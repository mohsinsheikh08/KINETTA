"use client";

import React, { useEffect } from "react";
import useAuth from "@/src/hooks/useAuth";
import useOrder from "@/src/hooks/useOrder";
import Link from "next/link";
import { Package, User, LogOut, ArrowRight, ShoppingBag } from "lucide-react";
import Loading from "@/src/components/LandingComp/Loading";
import Image from "next/image";

const ProfilePage = () => {
  const { user, Logout, getMe } = useAuth();
  const { allOrders, orders, loading } = useOrder();
  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (allOrders) allOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#f7f7f5] py-10 px-4 md:px-8 mt-10 md:mt-0">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[30%] bg-white p-6 border border-black/10 h-fit shadow-sm">
          <div className="flex items-center gap-4 mb-6 border-b border-black/10 pb-6">
            <div className="h-14 w-14 bg-black text-white flex items-center justify-center rounded-full text-2xl font-semibold uppercase">
              {user?.firstName.charAt(0)}
            </div>
            <div>
              <h2 className="font-semibold text-lg text-black">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-xs text-neutral-500">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/user"
              className="flex items-center gap-3 text-sm font-medium text-black bg-neutral-100 p-3 transition-colors"
            >
              <Package size={18} /> My Orders
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center gap-3 text-sm font-medium text-neutral-500 hover:bg-neutral-50 p-3 transition-colors"
            >
              <User size={18} /> My Wishlist
            </Link>
            <button
              onClick={() => {
                Logout();
              }}
              className="flex items-center gap-3 text-sm font-medium text-red-500 hover:bg-red-50 p-3 transition-colors mt-4 text-left w-full"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* ================= RIGHT MAIN AREA ================= */}
        <div className="w-full lg:w-[70%]">
          <h1 className="text-2xl md:text-3xl font-medium mb-6 uppercase tracking-widest text-black">
            My Orders
          </h1>

          {orders.length === 0 ? (
            <div className="bg-white p-10 text-center border border-black/10 shadow-sm flex flex-col items-center justify-center">
              <ShoppingBag
                size={48}
                className="text-neutral-300 mb-4"
                strokeWidth={1}
              />
              <p className="text-neutral-500 mb-6">
                You haven&apos;t placed any orders yet.
              </p>
              <Link
                href="/shop"
                className="bg-black text-white px-8 py-3 text-xs font-medium uppercase tracking-widest hover:bg-neutral-800 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white border border-black/10 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-wrap justify-between items-center gap-3 bg-neutral-50/50 p-4 md:p-5 border-b border-black/10">
                    <div className="flex gap-4 md:gap-8 text-sm">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold mb-0.5">
                          Order ID
                        </p>
                        <p className="font-medium">
                          #{order._id.slice(-6).toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold mb-0.5">
                          Date
                        </p>
                        <p className="font-medium">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-GB",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold mb-0.5">
                          Total
                        </p>
                        <p className="font-medium">
                          Rs. {order.totalAmount?.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm
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
                    </div>
                  </div>

                  {/* Card Body: Images & Action */}
                  <div className="p-4 md:p-5 flex flex-wrap items-center justify-between gap-4">
                    {/* Product Thumbnails */}
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-4">
                        {order.items?.slice(0, 3).map((item, idx: number) => (
                          <div
                            key={idx}
                            className="relative h-14 w-12 md:h-16 md:w-14 border-2 border-white bg-gray-100 overflow-hidden rounded-sm z-10 hover:z-20 transition-transform hover:scale-110"
                          >
                            {item.product?.thumbnail ? (
                              <Image
                                src={item.product.thumbnail}
                                alt="product"
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-neutral-200" />
                            )}
                          </div>
                        ))}
                        {order.items?.length > 3 && (
                          <div className="h-14 w-12 md:h-16 md:w-14 border-2 border-white bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-500 z-0">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">
                          {order.items?.length || 0} Items
                        </p>
                        <p className="text-xs text-neutral-500">Payment: COD</p>
                      </div>
                    </div>

                    {/* View Details Link */}
                    <Link
                      href={`/order/${order._id}`}
                      className="group flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-black pb-0.5 hover:text-neutral-600 transition-colors"
                    >
                      View Details
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
