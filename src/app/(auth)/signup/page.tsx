'use client';

import { Button } from '@/shared/components';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { useToast } from "@/shadcn/hooks/use-toast"
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { z } from 'zod';
import { SignInResponse, signIn } from 'next-auth/react';
// import { DatePickerForm } from "@/shared/components/DobForm";
import Link from 'next/link';


const EmailSchema = z.object({
   email: z
       .string()
       .email({ message: "Please enter a valid email."})
       .trim(),
})
export type UserSignInSchemaType = z.infer<typeof EmailSchema>;

export default function SignUp() {

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<UserSignInSchemaType>({ resolver: zodResolver(EmailSchema) });
    //const [ isDisabled, setIsDisabled ] = useState<boolean>();
    const [ isOauthLoading, setIsOauthLoading ] = useState<boolean>();
    const { toast } = useToast();

//     const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const email = event.target.value;
//         const validatedField = EmailSchema.safeParse({ email });
//         setIsDisabled(!validatedField.success);
//     }

    const onSubmit: SubmitHandler<UserSignInSchemaType> = async (formData) => {
        const { email } = formData;
        const res: SignInResponse | undefined = await signIn("email", {
            redirect: false,
            email,
            callbackUrl: `${process.env.NEXT_PUBLIC_ORIGIN}/onboard` // SINCE using 'use clint' the process object not received
        });
        if (res?.error) {
            toast({
                variant: "destructive",
                title: "Failed to send Verification Email",
                description: res.error
            });
        } else {
            toast({
                title: "Email Verification",
                description: "Check your inbox for verification email"
            });
        }
    };

    return (
        <>
            <p className="lg:text-3xl text-2xl font-bold pb-4">Sign up!</p>
            <Button
                variant="primary"
                className="rounded-md w-full my-3"
                onClick={() => {
                    setIsOauthLoading(true);
                    signIn('google', { callbackUrl: '/' })
                        .then(() => setIsOauthLoading(false))
                }}
                disabled={isOauthLoading || isSubmitting}
            >
                <IconBrandGoogleFilled/>
                <span className="px-3 text-md">Continue with Google</span>
            </Button>
            <div className="flex items-center gap-3 text-[gray] pt-2">
                <hr className="w-3/5 text-[#ccc]"/>or<hr className="w-3/5 text-[#ccc]"/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <fieldset>
                    <label
                          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                          htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        //onChange={validateEmail}
                        {...register("email")}
                    />
                    <p className="text-[.8rem] py-1 text-[gray]">
                        We&apos;ll send you an acknowledgment to verify your email.
                    </p>
                    <p className="text-sm pt-6">
                        Already have an account?
                        <Link href="/login" className="text-[blue] px-2">Login</Link>
                    </p>
                </fieldset>
                <Button
                   variant="success"
                   name="Continue with email"
                   className="w-full my-10 rounded-md"
                   type="submit"
                   loading={isSubmitting.toString()}
                   disabled={isSubmitting || isOauthLoading}
                />
            </form>
        </>
    )
}