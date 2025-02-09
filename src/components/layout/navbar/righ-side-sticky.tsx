"use client";

import { useEffect, useState } from "react";
import RightSide from "./right-side";

export default function RightSideSticky() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (isMobile) return; // Prevent sticky behavior for mobile devices
      if (window.pageYOffset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on component mount

    if (!isMobile) {
      window.addEventListener("scroll", toggleVisibility);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [isMobile]);

  if (isSticky) return <RightSide />;
  return;
}
