"use client";

import React, { useState, useEffect } from 'react';

export default function DrawingSketch() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const windowSize = window.innerHeight;
      const bodySize = document.body.offsetHeight;
      const progress = (scrollPosition / (bodySize - windowSize)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const svg = (
    <svg width="2938" className="w-full h-full pb-16 absolute -z-0" height="1821" viewBox="0 0 2938 1821" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={`M2920.5 0V${499.5 + (1131 - 499.5) * (scrollProgress / 100)}H1509.5V1131H17V1803.5H918.5`} stroke="black" stroke-width="34"/>
    </svg>
  )

  return svg;
}