"use client";
import { AdminDashboard } from "@/components/admin-dashboard";
import { ChatLayout } from "@/components/chat components/chat/chat-layout";
import { EducatorDashboard } from "@/components/educator-dashboard";
import { ParentDashboard } from "@/components/ui/parent-dashboard";
import useAuth from "@/hooks/useAuth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export default function Chat(){

    const { user, token } = useAuth();
    console.log(user)

    return(
        <div className="flex flex-col h-full items-center justify-center">
            {user?.roles.includes("ADMIN") ? (
                <div className="w-full h-full pt-20">
                    <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
                        <ChatLayout navCollapsedSize={8} />
                    </div>
                </div>
            ) : user?.roles.includes("PARENT") ? (
                <div className="w-full h-full pt-20">
                    <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
                        <ChatLayout navCollapsedSize={8} />
                    </div>
                </div>
            ) :null}
        </div>
    )

    
}