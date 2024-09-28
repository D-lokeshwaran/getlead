import { Button } from "@/shared/components";
import Link from 'next/link';

export default function TopNav() {

    return (
        <header className="z-50 flex items-center justify-between backdrop-blur-[2px] sticky top-0 whitespace-nowrap px-5 lg:px-10 py-3">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 lg:gap-4 text-[#1C160C]">
                    <div className="size-6">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_6_330)">
                                <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                                        fill="currentColor"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_6_330"><rect width="48" height="48" fill="white"></rect></clipPath>
                            </defs>
                        </svg>
                    </div>
                    <h2 className="text-[#1C160C] text-xl font-bold leading-tight tracking-[-0.015em]">Lead</h2>
                </div>
            </div>
            <div className="flex flex-1 justify-end gap-8">
                <div className="items-center gap-9 hidden md:flex">
                    <Link className="text-[#1C160C] text-sm font-medium leading-normal" href="/examples">Examples</Link>
                    <Link className="text-[#1C160C] text-sm font-medium leading-normal" href="/login">login</Link>
                </div>
                <Link href="/signup">
                    <Button name="Sign up" variant="success"/>
                </Link>
            </div>
      </header>
    )
}