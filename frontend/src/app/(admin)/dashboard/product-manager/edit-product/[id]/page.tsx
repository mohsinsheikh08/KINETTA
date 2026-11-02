"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Upload, Save, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useProduct from "@/src/hooks/useProduct";

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { getProduct, updateProduct, loading, currentProduct } = useProduct();
  const [initialized, setInitialized] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    category: "Men",
    subCategory: "Tops",
    price: "",
    stock: "",
    discount: "",
    taxAmount: "",
    sizes: "",
    colors: "",
  });

  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  if (currentProduct && !initialized) {
    setFormData({
      productName: currentProduct.productName || "",
      productDescription: currentProduct.productDescription || "",
      category: currentProduct.category || "Men",
      subCategory: currentProduct.subCategory || "Tops",
      price: currentProduct.price?.toString() || "0",
      stock: currentProduct.stock?.toString() || "0",
      discount: currentProduct.discount?.toString() || "0",
      taxAmount: currentProduct.taxAmount?.toString() || "0",
      sizes: currentProduct.sizes?.join(", ") || "",
      colors: currentProduct.colors?.join(", ") || "",
    });
    setCurrentImages(currentProduct.images || []);
    setInitialized(true);
  }

  useEffect(() => {
    getProduct(id);
  }, [id]);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key as keyof typeof formData]);
    });

    newImages.forEach((image) => {
      data.append("images", image);
    });

    try {
      await updateProduct(data, id);
      router.push("/dashboard/product-manager");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading Product Data...</div>;

  return (
    <div className="min-h-screen bg-[#f7f7f5] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard/product-manager"
            className="p-2 bg-white border border-black/10 hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-heading font-black uppercase tracking-widest text-black">
              Edit Product
            </h1>
            <p className="text-neutral-500 text-sm">
              Update inventory details and pricing.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* LEFT: Main Details */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <div className="bg-white p-6 border border-black/10 shadow-sm flex flex-col gap-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black/10 pb-2">
                  Basic Info
                </h2>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 text-sm border border-black/20 outline-none focus:border-black"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase">
                    Description
                  </label>
                  <textarea
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 text-sm border border-black/20 outline-none focus:border-black resize-none"
                  />
                </div>
              </div>

              <div className="bg-white p-6 border border-black/10 shadow-sm flex flex-col gap-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black/10 pb-2">
                  Images
                </h2>

                {/* Current Images */}
                <div className="flex gap-4 flex-wrap mb-4">
                  {currentImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-20 w-16 border border-black/10"
                    >
                      <Image
                        src={img}
                        alt="Product"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Upload New Images */}
                <div className="border-2 border-dashed border-black/20 p-6 flex flex-col items-center justify-center text-center hover:bg-neutral-50 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload size={24} className="text-neutral-400 mb-2" />
                  <p className="text-sm font-medium">
                    Click to upload new images
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {newImages.length} new images selected
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Pricing & Stock */}
            <div className="flex flex-col gap-6">
              <div className="bg-white p-6 border border-black/10 shadow-sm flex flex-col gap-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black/10 pb-2">
                  Pricing & Stock
                </h2>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase">
                    Original Price (Rs)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full p-3 text-sm border border-black/20 outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      className="w-full p-3 text-sm border border-black/20 outline-none focus:border-black"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase">
                      Tax (%)
                    </label>
                    <input
                      type="number"
                      name="taxAmount"
                      value={formData.taxAmount}
                      onChange={handleChange}
                      className="w-full p-3 text-sm border border-black/20 outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    className="w-full p-3 text-sm border border-black/20 outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="bg-white p-6 border border-black/10 shadow-sm flex flex-col gap-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black/10 pb-2">
                  Category & Variants
                </h2>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 text-sm border border-black/20 outline-none focus:border-black bg-white"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase">
                    Sub-Category
                  </label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="w-full p-3 text-sm border border-black/20 outline-none focus:border-black bg-white"
                  >
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase">
                    Sizes (Comma Separated)
                  </label>
                  <input
                    type="text"
                    name="sizes"
                    value={formData.sizes}
                    onChange={handleChange}
                    className="w-full p-3 text-sm border border-black/20 outline-none focus:border-black"
                    placeholder="S, M, L, XL"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase">
                    Colors (Comma Separated)
                  </label>
                  <input
                    type="text"
                    name="colors"
                    value={formData.colors}
                    onChange={handleChange}
                    className="w-full p-3 text-sm border border-black/20 outline-none focus:border-black"
                    placeholder="black, white, red"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 border-t border-black/10 pt-6">
            <Link
              href="/dashboard/product-manager"
              className="px-6 py-3 text-sm font-semibold text-neutral-600 hover:bg-neutral-200 transition-colors flex items-center gap-2"
            >
              <X size={16} /> Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-black text-white text-sm font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center gap-2 disabled:bg-neutral-400"
            >
              <Save size={16} /> {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
