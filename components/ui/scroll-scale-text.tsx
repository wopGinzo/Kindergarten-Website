"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

export default function ScrollScaleText(props: 
    { text: string, from: number | string, to: number | string, className?: string
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
            // opacity : scrollYProgress,
            letterSpacing: move
        }}
            className={cn("text-white text-center", props.className)}
            dangerouslySetInnerHTML={{ __html: props.text }}
        >

        </motion.span>
    )
    
}