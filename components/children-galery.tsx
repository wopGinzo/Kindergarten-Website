"use client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import ScrollText from "./ui/scroll-text";



export default function ChildrenGalery(props: 
    { className?: string}) {
    const variant = {
        visible: { scale: 1 },
        hidden: { scale: 0 },
      };
    return(
        <div className="w-full h-[100vh] overflow-hidden
        bg-cover bg-no-repeat bg-center bg-[url('../public/children/childrenbg.jpg')] flex flex-col
        justify-between bg-parallax bg-fixed relative">
                        <div className="absolute w-full h-[100vh] bg-cover bg-no-repeat bg-center bg-[url('../public/children/childrenbg.jpg')] 
                        bg-parallax bg-fixed blur-sm" />
                <div className="w-[100vw] h-[100vh]  flex justify-between overflow-hidden">
                        <div className="flex relative w-full h-[50vh] justify-between">
                                <ScrollText text="A time for fun" className="m-10 p-4 z-40 rounded-2xl bg-[#C8E4B2] text-black" from={-300} to={50}
                                        start="2 1" end="5 1" />
                        </div>


                        <div className="m-5">
                                <motion.img initial="hidden" whileInView="visible" variants={variant}
                                        src={"/children/children2.jpg"} alt="children" height={476} width={506}
                                        className="absolute right-5 shadow-2xl rounded-md h-max w-72 z-20" />
                        </div>
                        
                        <motion.img initial="hidden" whileInView="visible" variants={variant}
                                src={"/children/children3.jpg"} alt="children" height={472} width={707}
                                className="shadow-2xl rounded-md absolute top-36 w-72 right-60" />
                </div>
                <div className="flex justify-between items-end relative w-full h-[50vh] ">
                        <div className="h-auto pl-5">
                                <motion.img initial="hidden" whileInView="visible" variants={variant}
                                        src={"/children/children4.jpg"} alt="children" height={382} width={573}
                                        className="shadow-2xl rounded-md w-72 absolute -top-48 z-10" />
                        </div>
                        <div className="h-auto">
                                <motion.img initial="hidden" whileInView="visible" variants={variant}
                                        src={"/children/children6.jpg"} alt="children" height={327} width={490}
                                        className="shadow-2xl rounded-md w-72 absolute left-24 bottom-5 z-20" />
                        </div>
                        <div className="h-auto">
                                <motion.img initial="hidden" whileInView="visible" variants={variant}
                                        src={"/children/children5.jpg"} alt="children" height={422} width={750}
                                        className="shadow-2xl rounded-md w-72 absolute bottom-0 left-80 mb-3 z-30" />
                        </div>
                        <ScrollText text="And a time for success!" className="m-10 p-4 text-right z-40 justify-self-end rounded-2xl bg-[#45062E]"
                                from={5000} to={600} start="0 2" end="1 1" />

                </div>
        </div>
    )
}