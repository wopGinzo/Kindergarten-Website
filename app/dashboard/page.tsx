"use client";
import { AdminDashboard } from "@/components/admin-dashboard";
import { EducatorDashboard } from "@/components/educator-dashboard";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";



export default function Profile(){
    
    const { user, token } = useAuth();
    console.log(user)

    return(
        <div className="flex flex-col h-full items-center justify-center">
            {user?.roles.includes("ADMIN") ? (
                <div className="w-full h-full pt-20">
                    <AdminDashboard user={`${user?.sub}`} token={token} />
                </div>
            ) : user?.roles.includes("EDUCATOR") ? (
                <div className="w-full h-full pt-20">
                        <EducatorDashboard username={`${user?.sub}`} token={token} />

                </div>
            ) : null}
        </div>
    )

    
}