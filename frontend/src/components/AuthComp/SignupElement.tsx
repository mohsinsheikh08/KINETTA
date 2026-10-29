"use client";
import useAuth from "@/src/hooks/useAuth";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";

const SignupElement = () => {
  const [firstName, seFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Register, loading, error } = useAuth();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await Register({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  };

  const [eye, setEye] = useState(true);
  return (
    <div className="flex flex-col  w-80 items-center gap-3">
      <Link href="/">
        {" "}
        <Image
          src="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/KinettaText.png?updatedAt=1791505574850"
          className="w-50"
          width={300}
          height={300}
          alt=""
        />
      </Link>
      <p className="text-xl font-heading font-black uppercase">Kinetta Login</p>
      <p className="text-center min-w-70 max-w-80 font-body text-gray-600 font-[500] text-sm">
        Join the KINETTA community. Create an account to start building your
        ultimate training wardrobe.
      </p>
      {error && (
        <div className="w-full p-2 bg-red-50 border border-red-200 text-red-600 text-sm text-center">
          {error}
        </div>
      )}
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          submitHandler(e);
        }}
        className="w-full flex flex-col gap-3"
      >
        <input
          className="h-14 pl-5 border-[1.5px] outline-none border-black/10 w-full"
          placeholder="First Name"
          type="text"
          onChange={(e) => {
            seFirstName(e.target.value);
          }}
          required
        />
        <input
          className="h-14 pl-5 border-[1.5px] outline-none border-black/10 w-full"
          placeholder="Last Name"
          type="text"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          required
        />
        <input
          className="h-14 pl-5 border-[1.5px] outline-none border-black/10 w-full"
          placeholder="Email address"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <div className="flex h-14 items-center border-[1.5px] outline-none border-black/10">
          <input
            className="h-full pl-5  outline-none w-[88%]"
            placeholder="Password"
            type={eye ? "password" : "text"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
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
        <button
          type="submit"
          className="w-full py-3 bg-black cursor-pointer text-white font-body"
        >
          {loading ? "Signing..." : "Sign up"}
        </button>
      </form>
      <p className="text-gray-500 text-sm font-[500] font-body">
        Already have an account!{" "}
        <Link href="/login">
          {" "}
          <span className="underline font-bold  text-black">Log in</span>
        </Link>
      </p>
    </div>
  );
};

export default SignupElement;
