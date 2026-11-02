"use client";
import useAuth from "@/src/hooks/useAuth";
import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import Link from "next/link";

const AdminSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Register, loading, error } = useAuth();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await Register({ firstName, lastName, email, password });
  };

  const [eye, setEye] = useState(true);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#f7f7f5] px-4 py-10">
      <div className="flex flex-col w-full max-w-md items-center gap-4 bg-white p-8 border border-black/10 shadow-2xl relative overflow-hidden">
        
        {/* Top Yellow/Black Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

        <Link href="/">
          <Image
            src="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/KinettaText.png?updatedAt=1791505574850"
            className="w-40 mb-2"
            width={300}
            height={300}
            alt="Kinetta Logo"
            priority
          />
        </Link>
        
        <div className="text-center mb-2">
          <p className="text-xl font-heading font-black uppercase tracking-widest flex items-center justify-center gap-2">
            <ShieldCheck size={20} /> Admin Setup
          </p>
          <p className="text-center font-body text-neutral-500 text-xs mt-2 uppercase tracking-wider">
            Create credentials for authorized personnel.
          </p>
        </div>

        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler} className="w-full flex flex-col gap-4 mt-2">
          <div className="flex gap-3">
            <input
              className="h-12 px-4 text-sm border border-black/20 outline-none focus:border-black transition-colors w-1/2"
              placeholder="First Name"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className="h-12 px-4 text-sm border border-black/20 outline-none focus:border-black transition-colors w-1/2"
              placeholder="Last Name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          
          <input
            className="h-12 px-4 text-sm border border-black/20 outline-none focus:border-black transition-colors w-full"
            placeholder="Admin Email address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="flex h-12 items-center border border-black/20 focus-within:border-black transition-colors">
            <input
              className="h-full px-4 w-[88%] text-sm outline-none"
              placeholder="Secure Password"
              type={eye ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              onClick={() => setEye(!eye)}
              type="button"
              className="h-full w-[12%] flex justify-center items-center text-neutral-400 hover:text-black transition-colors"
            >
              {eye ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300
              ${loading ? "bg-neutral-400 cursor-not-allowed" : "bg-black hover:bg-neutral-800"}`}
          >
            {loading ? "Creating Account..." : "Register Admin"}
          </button>
        </form>

        <p className="text-neutral-500 text-xs font-medium mt-4">
          Already have admin access?{" "}
          <Link href="/admin-login">
            <span className="underline font-bold text-black hover:text-neutral-600 transition-colors">
              Secure Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;