"use client";

import { useEffect, useState, useCallback } from "react";

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = useCallback(() => {
    const scrollPx = window.scrollY;
    const winHeightPx =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (scrollPx / winHeightPx) * 100;
    setScrollProgress(scrolled);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress(); // Call once to set initial state

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, [updateScrollProgress]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[2px] z-50"
      style={{
        transform: `translate3d(-${100 - scrollProgress}%, 0, 0)`,
        transition: "transform 50ms linear",
        backgroundColor: "#E62B1E",
      }}
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
