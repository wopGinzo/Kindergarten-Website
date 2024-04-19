"use client";
import { motion, useAnimation } from "framer-motion";



export default function PopupText(props:{
    text: string;
    className: string;
    }
){
    const variant = {
        visible: { scale: 1 },
        hidden: { scale: 0 },
      };

    return(
        <motion.div
        initial="hidden"
        whileInView="visible"
        variants={variant}
        className={props.className}
        >
            {props.text}

        </motion.div>
    )
}