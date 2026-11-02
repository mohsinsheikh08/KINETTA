"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import useAuth from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Login, error, user } = useAuth();
  const [eye, setEye] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (
      user?.role === "super_admin" ||
      user?.role === "order_manager" ||
      user?.role === "product_manager"
    ) {
      console.log(user?.role);
      router.push("/dashboard");
    }
  }, [user, router]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await Login({ email, password });
  };

  return (
    <div className="w-full pt-5 flex items-center justify-center min-h-screen bg-[#f7f7f5] relative">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
      >
        <ArrowLeft size={16} /> Back to Store
      </Link>

      <div className="flex flex-col w-80 md:w-96 items-center gap-4 bg-white p-8 border border-black/10 shadow-2xl">
        <Link href="/">
          <Image
            src="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/KinettaText.png?updatedAt=1791505574850"
            className="w-40"
            width={300}
            height={300}
            alt="Kinetta Logo"
            priority
          />
        </Link>

        <div className="text-center mb-2">
          <p className="text-xl font-heading font-black uppercase tracking-widest flex items-center justify-center gap-2">
            Admin Portal
          </p>
          <p className="text-center font-body text-neutral-500 text-xs mt-2 uppercase tracking-wider">
            Authorized Personnel Only
          </p>
        </div>

        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-center flex items-center justify-center gap-2">
            <ShieldAlert size={14} />
            {error}
          </div>
        )}

        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-4 mt-2"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="h-12 px-4 text-sm border border-black/20 outline-none focus:border-black transition-colors w-full"
            placeholder="Admin Email"
            type="email"
            required
          />
          <div className="flex h-12 items-center border border-black/20 focus-within:border-black transition-colors">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="h-full px-4 w-[88%] text-sm outline-none"
              placeholder="Password"
              type={eye ? "password" : "text"}
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
            className="w-full py-3 bg-black text-white text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-colors mt-2"
          >
            Secure Login
          </button>
        </form>

        <p className="text-gray-500 text-sm font-[500] font-body">
          If you are new{" "}
          <Link href="/signup">
            {" "}
            <span className="underline font-bold  text-black">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
