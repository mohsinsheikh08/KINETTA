"use client";
import React, { createContext, useEffect, useState } from "react";
import { AuthStructure, Login, Register, User } from "../types/auth.types";
import { childrenType } from "../types/common.types";
import authService from "../services/auth.service";
import axios from "axios";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<AuthStructure | undefined>(undefined);

const AuthProvider = ({ children }: childrenType) => {
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<null | User>(null);
  const Register = async (data: Register) => {
    try {
      setError(null);
      setSubmitting(true);
      const result = await authService.register(data);
      setUser(result);
      navigate.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed!");
      }
    } finally {
      setSubmitting(false);
    }
  };
  const Login = async (data: Login) => {
    try {
      setError(null);
      setSubmitting(true);
      const result = await authService.login(data);
      setUser(result);
      console.log(result);
      navigate.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Login failed!");
      }
      setError("Login failed!");
    } finally {
      setSubmitting(false);
    }
  };
  const Logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await authService.logout();
      setUser(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Logout failed!");
      }
    } finally {
      setLoading(false);
    }
  };
  const getMe = async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await authService.getMe();
      setUser(result);
    } catch (err) {
      setUser(null);
      setError("User not found!");
      if (axios.isAxiosError(err) && err.response?.status === 401) {
      } else {
        setError("User not found!");
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data?.message || "User not found!");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const hasToken = document.cookie.includes("token");

      if (!hasToken) {
        setLoading(false);
        return; // ← API call skip
      }

      await getMe();
    };
    getUser();
  }, []);

  const value: AuthStructure = {
    submitting,
    loading,
    error,
    Register,
    Login,
    Logout,
    getMe,
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
