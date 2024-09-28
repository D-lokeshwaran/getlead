import { useToast } from '@/shadcn/hooks/use-toast';

export default function VerifyRequest() {
    const toast = useToast();


    return <>
        Check your Email!
        <button onClick={() => {
            toast({
                    title: "Email Verification",
                    message: "Check your inbox for verification email"
                });
            }}>
            toast
        </button>

    </>
}