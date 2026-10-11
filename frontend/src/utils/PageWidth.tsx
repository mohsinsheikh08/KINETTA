"use client";

import { useEffect, useState } from "react";

const PageWidth = () => {
  const [width, setwidth] = useState<number>(() => {
    if (typeof window !== undefined) {
      return window.innerHeight;
    }
    return 0;
  });
  useEffect(() => {
    setwidth(window.innerHeight);

    const handleResize = () => setwidth(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, []);

  return null;
};

export default PageWidth;
