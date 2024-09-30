import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/nextAuth/authOptions";
import Dashboard from "@/app/(dashboard)";
import Home from "@/app/(home)";
import Image from 'next/image';


export default async function App() {

    const session = await getServerSession(authOptions);

    if (session) {
        const user = session?.user;
        if (process.env.NODE_ENV === "production") {
            return (
                <div className="flex items-center justify-center flex-col h-screen bg-[#f4efe6]">
                    <Image
                        src="/work-inprogress.svg"
                        alt={`work in progress`}
                        height={300}
                        width={300}
                    />
                    <div className="py-3 text-center">
                        <p className="text-2xl font-bold py-2">We are under Construction</p>
                        <p>We&apos;ll soon back with wonders</p>
                    </div>
                    <div className="flex gap-2 items-center text-center py-4 flex-col ">
                        <Image
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                            height={34}
                            width={34}
                            alt={`${user?.name} profile`}
                            src={user?.image || "/icons/default-user.svg"}
                            referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-[#000000] font-medium leading-normal">{user?.name}</h1>
                            <h1 className="text-[#999999] text-[0.8rem] font-normal leading-normal">{user?.email}</h1>
                            {/*<h1 className="text-[#999999] text-[0.8rem] font-normal leading-normal">{user?.birthday}</h1>*/}
                            <a className="text-[blue] hover:underline cursor-pointer text-[0.8rem] font-normal leading-normal" href="/api/auth/signout">Sign out</a>
                        </div>
                    </div>
                    <div>
                        <span>Contact: </span>
                        <a className="text-[blue]" href={`mailto:${process.env.CC_EMAIL}`}>{process.env.CC_EMAIL}</a>
                    </div>
                </div>
            );
        }
        return <Dashboard/>
    }

    return (
        <Home/>
    )
}