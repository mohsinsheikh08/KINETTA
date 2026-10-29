"use client";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import useAuth from "@/src/hooks/useAuth";
const LoginElement = () => {
  const {} = useAuth();
  const [eye, setEye] = useState(true);
  return (
    <div className="w-full pt-5 flex items-center justify-center h-screen">
      <div className="flex flex-col  w-80 items-center gap-3">
        <Image
          src="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/KinettaText.png?updatedAt=1791505574850"
          className="w-50"
          width={300}
          height={300}
          alt=""
        />
        <p className="text-xl font-heading font-black uppercase">
          Kinetta Login
        </p>
        <p className="text-center min-w-70 max-w-80 font-body text-gray-600 font-[500] text-sm">
          Welcome to KINETTA. Log in to access your personalized training gear
          and exclusive drops.
        </p>
        <form className="w-full flex flex-col gap-3">
          <input
            className="h-14 pl-5 border-[1.5px] outline-none border-black/10 w-full"
            placeholder="Email address"
            type="email"
          />
          <div className="flex h-14 items-center border-[1.5px] outline-none border-black/10">
            <input
              className="h-full pl-5  w-[88%]"
              placeholder="Password"
              type={eye ? "password" : "text"}
            />
            <button
              onClick={() => {
                setEye(!eye);
              }}
              type="button"
              className="h-full  w-[13%] flex justify-center items-center"
            >
              {eye ? <Eye size={25} /> : <EyeClosed />}
            </button>
          </div>
          <button className="w-full py-3 bg-black text-white font-body">
            Login
          </button>
        </form>
        <p className="text-gray-500 text-sm font-[500] font-body">
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            {" "}
            <span className="underline font-bold  text-black">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginElement;
