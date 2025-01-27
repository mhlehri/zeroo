"use client";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";

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
      {isVisible && (
        <div className="fixed bottom-12 md:bottom-4 right-4">
          <Button onClick={scrollToTop} size="icon" className="rounded-full">
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}
