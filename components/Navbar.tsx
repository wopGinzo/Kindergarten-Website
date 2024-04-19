"use client";
import React, { useState } from "react";

import { cn } from "@/utils/cn";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { Handshake, MenuIcon, Search, Telescope } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "../public/logo.svg";
import Image from "next/image";



export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("absolute inset-x-0 flex justify-between items-center w-full", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} title="" itemIcon={
            <Image src={Logo} alt="logo" className="h-12 w-fit" />   
        }>

        </MenuItem>
        <div className="flex md:w-1/2 gap-2">

            <MenuItem setActive={setActive} active={active} itemClassname="hover:bg-white p-4 relative rounded-md transition" title="Discovery"
             titleClassname="" itemIcon={<Telescope />}>
            <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/web-dev">
                    <span className="hidden md:block">

                    Discovery
                    </span>
                    
                </HoveredLink>
                <HoveredLink href="/interface-design">
                    <span className="hidden md:block">
                    Services

                    </span>
                    <Handshake />            
                </HoveredLink>
                <HoveredLink href="/seo">
                    <span className="hidden md:block">
                    About Us

                    </span>
                    <Search />
                </HoveredLink>
                <HoveredLink href="/branding">
                
                    Branding
                </HoveredLink>
            </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} itemClassname="hover:bg-white p-4 relative rounded-md transition" title="Services"
             titleClassname="" itemIcon={<Handshake />}>
            <div className="  text-sm grid grid-cols-2 gap-10 p-4">

            </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} itemClassname="hover:bg-white p-4 relative rounded-md transition" title="About Us"
             titleClassname="" itemIcon={<Search />}>

            </MenuItem>
            <MenuItem setActive={setActive} active={active} itemClassname="hover:bg-white p-4 relative rounded-md transition fixed right-5 z-50" title="Menu"
             titleClassname="md:hidden" itemIcon={<MenuIcon />}>
            <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/hobby">Hobby</HoveredLink>
                <HoveredLink href="/individual">Individual</HoveredLink>
                <HoveredLink href="/team">Team</HoveredLink>
                <ThemeToggle />
            </div>
            </MenuItem>
        </div>
      </Menu>
    </div>
  );
}
