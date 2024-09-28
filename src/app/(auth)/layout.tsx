import { Toaster } from "@/shadcn/components/ui/toaster";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex justify-center items-center md:h-screen overflow-y-auto">
            <div className="rounded-xl lg:w-96 w-80 md:px-0 px-3">
                <div className="flex items-center gap-3 text-[#1C160C] md:py-6 py-10">
                    <div className="size-10">
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
                    <h2 className="text-[#1C160C] text-2xl font-bold leading-tight tracking-[-0.015em]">Lead</h2>
                </div>
                <main>
                    {children}
                    <Toaster/>
                </main>
            </div>
        </div>
    )
}