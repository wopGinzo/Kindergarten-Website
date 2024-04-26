"use client";
import React, { useState } from "react";

import { cn } from "@/utils/cn";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { Calendar, Handshake, MenuIcon, Search, Telescope } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "../public/logo.svg";
import Image from "next/image";
import Link from "next/link";



export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("absolute inset-x-0 flex md:justify-between items-center w-full z-50 ", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <Image src={Logo} alt="logo" className="h-12 w-fit" />   

        </Link>  
        <div className="flex w-full md:w-1/2 md:gap-2">

            <MenuItem setActive={setActive} active={active} itemClassname=" p-4 relative rounded-md " link="discovery" title="Discovery"
             titleClassname="" itemIcon={<Telescope />}>
            <div className="flex flex-col space-y-4 text-sm">
              <ProductItem title="Plans" href="/discovery" src="/children/childrenbg.jpg" description="360' View of the entire facility." />
            </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} itemClassname=" p-4 relative rounded-md " link="events" title="Events"
             titleClassname="" itemIcon={<Calendar />}>
              <div className="flex flex-col text-sm gap-10 p-4">
                <HoveredLink href="/events/upcoming">
                  <span className="hidden md:block">
                    Upcoming Events
                  </span>
                </HoveredLink>
                <HoveredLink href="/events">
                  <span className="hidden md:block">
                    Events History
                  </span>
                </HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} itemClassname=" p-4 relative rounded-md " link="services" title="Services"
             titleClassname="" itemIcon={<Handshake />}>
              <div className=" flex flex-col text-sm gap-10 p-4">
                <ProductItem title="Plans" href="/services" src="/plans/kindergarten-3.jpg" description="Age based education plans." />
                <ProductItem title="Schedules" href="/services" src="/plans/half-day.jpg" description="Hourly schedule options." />
              </div>
            </MenuItem>


            <MenuItem setActive={setActive} active={active} itemClassname=" p-4 relative rounded-md " link="about" title="About Us"
             titleClassname="" itemIcon={<Search />}>

            </MenuItem>
            <MenuItem setActive={setActive} active={active} itemClassname=" p-4 relative rounded-md fixed right-5 z-50" title="Menu"
             titleClassname="md:hidden" itemIcon={<MenuIcon />}>
            <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/">Menu</HoveredLink>
                <HoveredLink href="/">Pre-Register</HoveredLink>
                <HoveredLink href="/">Login</HoveredLink>
                <ThemeToggle />
            </div>
            </MenuItem>
        </div>
      </Menu>
    </div>
  );
}
