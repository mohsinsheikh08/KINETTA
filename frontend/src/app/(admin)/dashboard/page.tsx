"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/src/hooks/useAuth";
import { Package, ShoppingBag, Users, Lock, ArrowRight, LogOut } from "lucide-react";

const DashboardPage = () => {
  const { user, Logout } = useAuth(); // Logout function nikala
  const router = useRouter();

  // 🚨 Security: Agar user null hai toh kuch mat dikhao
  if (!user) return null;

  // 3 Boxes ka Data
  const modules = [
    {
      id: "product_manager",
      title: "Product Manager",
      description: "Add, edit, and manage KINETTA's inventory.",
      icon: Package,
      path: "/dashboard/product-manager",
      allowedRoles: ["super_admin", "product_manager"],
    },
    {
      id: "order_manager",
      title: "Order Manager",
      description: "Track sales, shipments, and customer orders.",
      icon: ShoppingBag,
      path: "/dashboard/orders",
      allowedRoles: ["super_admin", "order_manager"],
    },
    {
      id: "user_manager",
      title: "User Manager",
      description: "Manage customers, ban suspicious accounts.",
      icon: Users,
      path: "/dashboard/users",
      allowedRoles: ["super_admin", "user_manager"],
    },
  ];

  const handleLogout = async () => {
    // Confirm karna zaroori hai taaki galti se logout na ho jaye
    if (window.confirm("Are you sure you want to securely log out?")) {
      await Logout();
      router.push("/admin-login");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* 🚨 TOP BAR (User Info & Logout) */}
        <div className="flex justify-between items-center bg-white border border-black/10 p-4 mb-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-black text-white flex items-center justify-center rounded-full text-sm font-bold uppercase">
              {user.firstName?.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-sm font-bold text-black">{user.firstName} {user.lastName}</p>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">
                {user.role.replace("_", " ")}
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:text-white hover:bg-red-500 px-4 py-2 border border-red-500 transition-all duration-300"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Header */}
        <div className="mb-12 border-b border-black/10 pb-6">
          <h1 className="text-3xl font-heading font-black uppercase tracking-widest text-black">
            Admin Control Center
          </h1>
          <p className="text-neutral-500 text-sm mt-2">
            Welcome back, {user.firstName}. Please select a module to manage.
          </p>
        </div>

        {/* 3 Main Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module) => {
            const hasAccess = module.allowedRoles.includes(user.role);

            return (
              <div
                key={module.id}
                onClick={() => {
                  if (hasAccess) {
                    router.push(module.path);
                  } else {
                    alert("Access Denied! You do not have permission to access this module.");
                  }
                }}
                className={`relative p-8 border transition-all duration-300 cursor-pointer group flex flex-col justify-between h-64
                  ${
                    hasAccess
                      ? "bg-white border-black/10 hover:border-black hover:shadow-xl"
                      : "bg-neutral-100 border-transparent opacity-60 cursor-not-allowed grayscale"
                  }`}
              >
                {/* Icon & Lock */}
                <div className="flex justify-between items-start">
                  <div className={`p-4 rounded-full ${hasAccess ? "bg-black text-white" : "bg-neutral-300 text-neutral-500"}`}>
                    <module.icon size={28} strokeWidth={1.5} />
                  </div>
                  {!hasAccess && (
                    <div className="p-2 bg-neutral-200 rounded-full text-neutral-500">
                      <Lock size={20} />
                    </div>
                  )}
                </div>

                {/* Text */}
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-wider mb-2">
                    {module.title}
                  </h2>
                  <p className={`text-xs ${hasAccess ? "text-neutral-500" : "text-neutral-400"}`}>
                    {module.description}
                  </p>
                </div>

                {/* Hover Arrow for Accessible Boxes */}
                {hasAccess && (
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    <ArrowRight size={24} className="text-black" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;