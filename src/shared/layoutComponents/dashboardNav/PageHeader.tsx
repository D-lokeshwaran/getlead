'use client'

import { SideNav } from "@/shared/layoutComponents";
import { useSession } from "next-auth/react";
import { Separator } from "@/shadcn/components/ui/separator"
import Image from 'next/image';

export default function PageHeader() {
    const { data: session } = useSession();
    const user = session?.user;
    return (
        <div className="sticky top-0 bg-[white] w-screen">
            <div className="container flex min-w-72 p-4 flex-row justify-between items-center gap-4 md:hidden block w-screen">
                <div className="flex items-center gap-3">
                    <SideNav asSheet />
                    <p className="text-[#1C160C] font-black leading-tight tracking-[-0.033em]">
                        {user?.name}&apos;s Workspace
                    </p>
                </div>
                <Image
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-7"
                    src={user?.image || "/icons/default-user.svg"}
                    height={24}
                    width={24}
                    alt={`${user?.name} profile`}
                    referrerPolicy="no-referrer"
                />
            </div>
            <Separator/>
        </div>
    )
}