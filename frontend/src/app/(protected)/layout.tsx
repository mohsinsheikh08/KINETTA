"use client";
import Loading from "@/src/components/LandingComp/Loading";
import useAuth from "@/src/hooks/useAuth";
import { childrenType } from "@/src/types/common.types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage({ children }: childrenType) {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Loading />;
  }

  return <>{children}</>;
}
