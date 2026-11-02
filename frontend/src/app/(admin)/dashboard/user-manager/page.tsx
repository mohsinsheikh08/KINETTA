"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Search, Trash2 } from "lucide-react";
import useAuth from "@/src/hooks/useAuth";
import Loading from "@/src/components/LandingComp/Loading";
const UserManager = () => {
  const { getAllUsers, deleteUser, loading, users } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to ban/delete this user? This action cannot be undone.",
      )
    ) {
      try {
        await deleteUser(id);
        users.filter((user) => user._id !== id);
      } catch (error) {
        console.error("Failed to delete user", error);
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
              User Manager
            </h1>
            <p className="text-neutral-500 text-sm">
              Manage registered customers and ban suspicious accounts.
            </p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white border border-black/10 shadow-sm overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-black/10 bg-neutral-50/50 flex justify-between items-center">
            <div className="relative w-full max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by Name or Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-black/20 outline-none focus:border-black"
              />
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-black bg-neutral-200 px-4 py-2">
              <Users size={16} /> Total: {users.length}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-100 text-xs uppercase tracking-wider text-neutral-500 font-bold">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-neutral-50 transition-colors group"
                  >
                    <td className="px-6 py-4 font-semibold text-black flex items-center gap-3">
                      <div className="h-8 w-8 bg-black text-white rounded-full flex items-center justify-center text-xs uppercase">
                        {user.firstName?.charAt(0)}
                      </div>
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}{" "}
          
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors opacity-0 group-hover:opacity-100"
                        title="Ban / Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="p-12 text-center text-neutral-500">
                No users found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
