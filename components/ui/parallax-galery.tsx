"use client";
import NextImage from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";


import { Butterfly_Kids } from "next/font/google";
import { Coming_Soon } from "next/font/google";
import { McLaren } from "next/font/google";


const mcLaren = McLaren({
  weight:"400",
  subsets: ['latin']
})
const comingSoon = Coming_Soon({
  weight:"400",
  subsets: ['latin']
})

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function ParallaxImage(props: {
    title:string,
    description?:string,
    imgURL:string
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="h-screen flex flex-col justify-center items-center relative snap-y snap-start perspective-[500px] text-[#373737] dark:text-[#F8F0DF]" >
      <div ref={ref} className="rounded-xl w-[800px] hover:scale-125 transition hover:shadow-2xl h-[400px] relative max-h-screen mx-20 bg-black overflow-hidden" >
        <NextImage className="absolute object-cover top-0 left-0 right-0 bottom-0 w-full h-full" fill src={props.imgURL} alt={props.title} />
      </div>
      <motion.h2 style={{ y }} className={`${comingSoon.className} bg-white dark:bg-[#79B4B7] p-2 rounded-2xl text-4xl`} >{props.title}</motion.h2>
      <motion.span  className={`${mcLaren.className} text-xl w-2/3 -mt-10`} > {props.description} </motion.span>
    </section>
  );
}

export default function ParallaxImages(props:{images:
 {
    title:string,
    description?:string,
    imgURL:string
 }[]    }
) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.5
  });

  useLayoutEffect(() => {
    document.documentElement.style.scrollSnapType = 'y mandatory';
    const footer = document.querySelector('footer');
    if (footer) {
      footer.classList.add('snap-start', 'snap-always') ;
    }
    return () => {
      document.documentElement.style.scrollSnapType = '';
      if (footer) {
        footer.classList.remove('snap-start', 'snap-always');
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollSnapType = 'y mandatory';


    return () => {
      document.documentElement.style.scrollSnapType = '';

    };
  }, []);

  return (
    <div className="w-full h-full text-center text-4xl flex flex-col items-center justify-center">
      {props.images.map((image) => (
        <ParallaxImage title={image.title} description={image.description} imgURL={image.imgURL} />
      ))}
      {/* <motion.div className=" fixed left-0 right-0 h-5 bg-red-500" style={{ scaleX }} /> */}
    </div>
  );
}
