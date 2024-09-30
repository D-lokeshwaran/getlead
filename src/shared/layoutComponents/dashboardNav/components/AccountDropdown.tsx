'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { signOut } from 'next-auth/react';
import { IconChevronDown, IconSettingsFilled } from '@tabler/icons-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface AccountDropdownType {
    toggleAccountDetails: () => void;
}

export default function AccountDropdown({ toggleAccountDetails }: AccountDropdownType ) {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex gap-2 items-center justify-start w-48 md:w-60 cursor-pointer hover:bg-[#f4f2efdb] rounded-lg py-2 px-2">
                    <div
                        className="rounded-full py-[0.2rem] px-[0.6rem] bg-green-primary text-[white] flex items-center justify-center"
                    >D</div>
                    <h1 className="text-[#000000] truncate font-bold leading-normal">{user?.name}&apos;s Workspace</h1>
                    <IconChevronDown/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="focus-visible:outline-none">
                <DropdownMenuItem
                    className="flex justify-between w-80"
                    onClick={() => toggleAccountDetails?.()}
                >
                    <div className="flex gap-2 items-start">
                        <Image
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-7"
                            src={user?.image || "/icons/default-user.svg"}
                            alt={`${user?.name} profile`}
                            height={24}
                            width={24}
                            referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-[#000000] font-medium leading-normal">{user?.name}</h1>
                            <h1 className="text-[#999999] text-[0.8rem] font-normal leading-normal">{user?.email}</h1>
                        </div>
                    </div>
                    <IconSettingsFilled className="text-[#999999] size-5"/>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                    <DropdownMenuItem>{user?.name}&apos;s Workspace</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-[red] hover:text-[red]"
                    onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_ORIGIN}/login` })}
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}