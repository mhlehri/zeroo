"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpToLine } from "lucide-react";

import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className={`${isVisible ? "right-4" : "-right-10"} fixed bottom-16 z-50 transition-discrete duration-300 md:bottom-6`}
      >
        <Button onClick={scrollToTop} size="icon" className="rounded-full">
          <ArrowUpToLine className="size-3 md:size-4" />
        </Button>
      </div>
    </>
  );
}
