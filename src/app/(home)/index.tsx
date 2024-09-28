import Image from "next/image";
import { Button } from "@/shared/components";
import Link from 'next/link';
import HomeLayout from './layout';

export default function Home() {
    return (
        <HomeLayout>
            <div className="flex justify-center items-center gap-8 flex-col lg:flex-row">
                <Image src="/ai-powered.png" alt="ai powered neural network" height={316} width={400}/>
                <div>
                    <h1 className="text-[#1C160C] text-5xl max-w-[480px] font-black leading-tight tracking-[-0.033em]">
                        A new medium for learning outlet. Powered by AI.
                    </h1>
                    <p className="max-w-[480px] py-2">
                        Structured modules, doubts clarification, translation and gemini ai supported.
                    </p>
                    <Link href="/signup">
                        <Button name="Getting Started" variant="success" className="w-full"/>
                    </Link>
                </div>
            </div>
        </HomeLayout>
    )
}