"use client";
import { AdminDashboard } from "@/components/admin-dashboard";
import ChatComponent from "@/components/chat";
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
                <div className="w-[100vw] h-[140vh] pt-20">
                    <div className="w-[100vw] h-[80vh]">
                        <ChatComponent role="ADMIN" token={token} username={user.sub} />
                    </div>
                </div>
            ) : user?.roles.includes("PARENT") ? (
                <div className="w-[100vw] h-[140vh] pt-20">
                    <div className="w-[100vw] h-[80vh]">
                        <ChatComponent role="PARENT" token={token} username={user.sub} />
                    </div>
                </div>
            ) :null}
        </div>
    )

    
}