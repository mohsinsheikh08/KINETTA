"use client";
import React, { useState } from "react";
import { Lock, ArrowRight, ShieldAlert } from "lucide-react";
import useAuth from "@/src/hooks/useAuth";

const AdminGate = () => {
  const [securityKey, setSecurityKey] = useState("");
  const { loading, adminCheck, error, adminVerification } = useAuth();
console.log("Admin verification status:", adminVerification);
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      adminCheck(securityKey);
    } catch (error) {
      console.error("Error occurred while verifying security key.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

      <div className="w-full max-w-md bg-white border border-black/10 p-8 md:p-12 shadow-2xl relative z-10">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 bg-black rounded-full flex items-center justify-center shadow-lg">
            <Lock size={28} className="text-white" strokeWidth={1.5} />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-2xl font-heading font-bold tracking-[0.02em] text-black uppercase mb-2">
            Restricted Area
          </h1>
          <p className="text-sm text-neutral-500 font-medium">
            Enter the master security key to access the Admin Portal.
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
              Security Key
            </label>
            <input
              type="password"
              placeholder="Enter secret code..."
              value={securityKey}
              onChange={(e) => setSecurityKey(e.target.value)}
              required
              className="w-full border border-black/20 p-4 text-center text-lg tracking-[0.3em] font-mono focus:outline-none focus:border-black transition-colors rounded-none placeholder:tracking-normal placeholder:font-sans placeholder:text-sm"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs font-medium bg-red-50 p-3 border border-red-100">
              <ShieldAlert size={16} />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || securityKey.length === 0}
            className={`w-full flex items-center justify-center gap-2 p-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 mt-2
              ${loading || securityKey.length === 0 ? "bg-neutral-400 cursor-not-allowed" : "bg-black hover:bg-neutral-800"}`}
          >
            {loading ? (
              <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
            ) : (
              <>
                Verify Access <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
        <p className="text-center text-[10px] text-neutral-400 mt-8 uppercase tracking-widest">
          Unauthorized access is strictly prohibited.
        </p>
      </div>
    </div>
  );
};

export default AdminGate;
