"use client";

import { usePathname } from "next/navigation";
import { childrenType } from "../types/common.types";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function Motion({ children }: childrenType) {
  const path = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [path]);

  return (
    <motion.div
      key={path}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex-grow"
    >
      {children}
    </motion.div>
  );
}
