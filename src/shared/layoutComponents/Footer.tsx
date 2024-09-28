import Image from "next/image";
import { Button } from "@/shared/components";

export default function Footer() {
    return (
        <footer>
            <div className="flex justify-center gap-1">
                <Button variant="icon-default">
                    <div data-icon="Linkedin" data-size="20px" data-weight="regular">
                       <Image src="/icons/linkedin.svg" alt="Linkedin profile" width={24} height={24}/>
                    </div>
                </Button>
                <Button variant="icon-default">
                    <div data-icon="Github" data-size="20px" data-weight="regular">
                       <Image src="/icons/github.svg" alt="github profile" width={24} height={24}/>
                    </div>
                </Button>
            </div>
            <div className="text-[#A1824A] text-center py-5">© 2024 Leadge Tech, Inc</div>
        </footer>
    )
}