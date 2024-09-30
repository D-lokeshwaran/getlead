'use client'

import {
    IconEye,
    IconEyeOff,
    IconBrandGoogleFilled
} from '@tabler/icons-react';
import { Button } from '@/shared/components';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInResponse, signIn } from 'next-auth/react';
import { useToast } from "@/shadcn/hooks/use-toast";
import { useToggle } from '@/shared/hooks';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const AuthSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email."}).trim(),
    password: z.string()
})
export type AuthSchemaType = z.infer<typeof AuthSchema>;

const passwordIconClass = "absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 cursor-pointer";

export default function LoginInPage() {

    const {
        handleSubmit,
        register,
        formState: { isSubmitting }
    } = useForm<AuthSchemaType>({ resolver: zodResolver(AuthSchema) });
    const [ showPassword, toggleShowPassword ] = useToggle();
    const router = useRouter();
    const { toast } = useToast();

    const onSubmit: SubmitHandler<AuthSchemaType> = async (formData) => {
        const res: SignInResponse | undefined = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        })
        if (res?.error) {
            toast({
                variant: "destructive",
                title: "Failed to Login",
                description: res.error
            })
        } else {
            router.push("/");
        }
    }

    return (
        <>
            <p className="lg:text-3xl text-2xl font-bold">Welcome back!</p>
            <p className="lg:text-md text-sm pb-4">Login to your account</p>
            <Button
                variant="primary"
                className="rounded-md w-full my-3"
                disabled={isSubmitting}
                onClick={() => {signIn('google', { callbackUrl: '/' })}}
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
                        {...register("email")}
                        required
                    />
                </fieldset>
                <fieldset>
                    <label
                        className="my-3 block text-xs font-medium text-gray-900"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            {...register("password")}
                            required
                            minLength={6}
                        />
                        {showPassword ?
                              <IconEyeOff className={passwordIconClass} onClick={() => toggleShowPassword()} />
                            : <IconEye className={passwordIconClass} onClick={() => toggleShowPassword()}/>
                        }
                    </div>
                </fieldset>
                <p className="text-sm pt-6">
                    Don&apos;t have an account?
                    <Link href="/signup" className="text-[blue] px-2">Sign up</Link>
                </p>
                <Button
                    variant="success"
                    name="Login"
                    className="w-full my-10 rounded-md"
                    disabled={isSubmitting}
                    loading={isSubmitting.toString()}
                    type="submit"
                />
            </form>
        </>
    )
}