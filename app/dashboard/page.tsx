"use client";
import { AdminDashboard } from "@/components/admin-dashboard";
// import Redirector from "@/components/redirector";
import useAuth from "@/hooks/useAuth";



export default function Profile(){
    
    const { user, token } = useAuth();
    console.log(user)
    
    return(
        <div className="flex flex-col h-full items-center justify-center">
            {/* <Redirector loggedOn={true} /> */}
            {user?(
                <div className="w-full h-full pt-20">
                    <AdminDashboard user={user} token={token} />
                </div>
            ):
                null
            }
        </div>
    )

    
}