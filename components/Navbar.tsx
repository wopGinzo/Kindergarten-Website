import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { EllipsisVertical, Handshake, Menu, Search, Telescope } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import Logo from "../public/logo.svg";

export default function NavBar() {
    return(
        <nav className="h-[10vh] w-full border-b px-5 lg:px-14 flex items-center justify-between">
            <Link href={""}>

                <Image src={Logo} alt="logo" className="h-12 w-fit" />   
            </Link>
            <div className="flex items-center gap-x-10">
                <Link href={""} className="flex items-center gap-x-3">
                    <span className="">

                    Discovery
                    </span>
                    <Telescope />
                </Link>
                <Link href={""} className="flex items-center gap-x-3">
                    <span className="">
                    Services

                    </span>
                    <Handshake />
                </Link>
                <Link href={""} className="flex items-center gap-x-3">
                    <span className="">
                    About Us

                    </span>
                    <Search />
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="bg-primary">

                            <Menu />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>

                        <DropdownMenuItem>
                            <Link href={""}>Sign Up</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={""}>Login</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <ThemeToggle />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </nav>
    )
}