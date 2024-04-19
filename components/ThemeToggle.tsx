"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "./ui/switch"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const toggle = () => {
    if (theme == "light") {
      return setTheme("dark");
    }
    return setTheme("light");
  }
  
  return (
    <>
    <div className="flex items-center gap-3">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Switch onCheckedChange={() => toggle()} defaultChecked={theme =="dark" ? true : false} />
    </div>
    {/* <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-between gap-x-3">
          <span className="">Theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> */}
    </>
  )
}
