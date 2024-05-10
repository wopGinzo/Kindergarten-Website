"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  link,
  itemClassname,
  title,
  titleClassname,
  itemIcon,
  children,
}: {
  setActive: (title: string) => void;
  active: string | null;
  itemClassname? : string;
  link? : string;
  title: string;
  titleClassname?: string;
  itemIcon?: any;
  children?: React.ReactNode;
}) => {
    
  return (
    <div onMouseEnter={() => setActive(title)} className={cn("relative hover:bg-[#937DC2] dark:hover:bg-[#395B64] transition duration-500 ease-out", itemClassname)}>
      {/* <div className="bg-[#937DC2] dark:bg-[#395B64] absolute w-full h-full -z-50 inset-0 rounded-md blur-sm" /> */}
      <motion.div
        transition={{ duration: 0.3 }}
        className={cn("flex gap-x-3 cursor-pointer text-[#373737] hover:opacity-[0.9] dark:text-[#F8F0DF] z-50")}
      >
        {link? (
          <Link className={cn("flex gap-x-3", titleClassname)} href={cn(link)}>
            <span className="hidden md:flex" >
              {title}</span>
            {itemIcon}
          </Link>
        ) : (
          <>
          <span className={cn("hidden md:flex", titleClassname)}>{title}</span>
          {itemIcon}
          </>
        )}
      </motion.div>
      {active !== null && children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === title && title != "Menu" && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-[#937DC2] dark:bg-[#395B64] backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
          {active === title && title === "Menu" && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4 pr-10">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-[#937DC2] dark:bg-[#395B64] backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full boder border-transparent dark:border-white/[0.2] bg-transparent items-center shadow-input flex justify-between w-full md:space-x-4 md:px-8 py-2 "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-[#FEFFAC] dark:text-white">
          {title}
        </h4>
        <p className="text-[#FEFFAC] text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-[#FEFFAC] dark:text-neutral-200 hover:text-[#FEFFAC] "
    >
      {children}
    </Link>
  );
};
