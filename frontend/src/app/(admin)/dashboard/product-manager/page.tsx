"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import useProduct from "@/src/hooks/useProduct";
import Loading from "@/src/components/LandingComp/Loading";

const ProductManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { getAllProducts, loading, products, deleteProduct } = useProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      await getAllProducts();
    };
    fetchProducts();
  }, []);

  const productsArray = Array.isArray(products) ? products : [];

  console.log(productsArray.map((product) => product.stock));

  const filteredProducts = productsArray.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product with ID:", id);
      await deleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-black mb-4 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-heading font-black uppercase tracking-widest text-black">
              Product Manager
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              Manage your inventory, pricing, and stock.
            </p>
          </div>

          <Link
            href="/dashboard/product-manager/add"
            className="flex items-center gap-2 bg-black text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
          >
            <Plus size={16} /> Add New Product
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 border border-black/10 flex items-center gap-4">
            <div className="p-3 bg-black text-white rounded-full">
              <Package size={20} />
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider">
                Total Products
              </p>
              <p className="text-2xl font-semibold">{productsArray.length}</p>
            </div>
          </div>
          <div className="bg-white p-5 border border-black/10 flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-full">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider">
                Out of Stock
              </p>
              <p className="text-2xl font-semibold">
                {productsArray.filter((p) => Number(p.stock) === 0).length}
              </p>
            </div>
          </div>
          <div className="bg-white p-5 border border-black/10 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider">
                Low Stock (≤5)
              </p>
              <p className="text-2xl font-semibold">
                {
                  productsArray.filter(
                    (p) => Number(p.stock) > 0 && Number(p.stock) <= 5,
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-black/10 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-black/10 flex justify-between items-center bg-neutral-50/50">
            <div className="relative w-full max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-black/20 outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-neutral-500">
              <Loader2 className="animate-spin mb-4" size={32} />
              <Loading />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-100 text-xs uppercase tracking-wider text-neutral-500 font-bold">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-neutral-50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-10 bg-gray-100 overflow-hidden border border-black/5">
                            <Image
                              src={product.thumbnail}
                              alt={product.productName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-semibold text-black">
                            {product.productName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        Rs. {product.price?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {Number(product.stock) === 0 ? (
                          <span className="text-red-500 font-bold">
                            Out of Stock
                          </span>
                        ) : Number(product.stock) <= 5 ? (
                          <span className="text-yellow-600 font-bold">
                            {product.stock} (Low)
                          </span>
                        ) : (
                          <span className="text-green-600 font-medium">
                            {product.stock}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm
                          ${product.isActive ? "bg-green-100 text-green-800" : "bg-neutral-200 text-neutral-600"}`}
                        >
                          {product.isActive ? "Active" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/dashboard/product-manager/edit-product/${product._id}`}
                            className="p-2 text-neutral-500 hover:text-black hover:bg-neutral-200 rounded-sm transition-colors"
                            title="Edit Product"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="p-12 text-center text-neutral-500">
                  No products found matching {searchTerm}.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
