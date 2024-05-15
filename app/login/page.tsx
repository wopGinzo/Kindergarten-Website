import { LoginForm } from "@/components/login-form";
// import Redirector from "@/components/redirector";

export default function Login(){
    return(
        <div className="flex flex-col h-[100vh] items-center justify-center">
            {/* <Redirector loggedOn={false} /> */}
            <LoginForm />
        </div>
    )
}