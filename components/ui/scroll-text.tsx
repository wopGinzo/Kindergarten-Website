"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

export default function ScrollText(props: 
    { text: string, from: number, to: number, className?: string
        start: any, end: any
    }) {
    const textArray: string[] = props.text.split('<br/>');        
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [props.start , props.end]
      })
    const move = useTransform(scrollYProgress, [0,1] , [props.from, props.to])

    return(
        <motion.span ref={ref} style={{
            opacity : scrollYProgress,
            x: move
        }}
            className={cn("text-white text-center absolute bg-black", props.className)}
            dangerouslySetInnerHTML={{ __html: props.text }}
        >

        </motion.span>
    )
    
}