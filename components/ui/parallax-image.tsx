"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
  }
  
  export default function ParallaxImage({ id }: { id: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);
  
    return (
      <section>
        <div ref={ref} className="fixed">
          <div className="absolute h-3/4 w-72 bg-lime-600 border-blue-600 border" />
        </div>
        <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
      </section>
    );
  }
  