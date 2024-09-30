'use client'

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Label } from "@/shadcn/components/ui";
import { Button } from "@/shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import BirthdayField from "@/shared/components/BirthdayField";
import { useToggle } from '@/shared/hooks';
import { useState } from "react";
import {
    IconEye,
    IconEyeOff
} from '@tabler/icons-react';
import { useToast } from "@/shadcn/hooks/use-toast";
import { signIn } from "next-auth/react";

const NewUserSchema = z.object({
    name: z.string().trim().min(3),
    password: z.string().trim(),
})
export type NewUserSchemaType = z.infer<typeof NewUserSchema>;

export default function OnboardPage() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<NewUserSchemaType>({ resolver: zodResolver(NewUserSchema) });
    const [ birthday, setBirthday ] = useState<Date | undefined>(undefined);
    const [ showPassword, toggleShowPassword ] = useToggle();
    const { toast } = useToast();
    const passwordIconClass = "absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 cursor-pointer";

    const onSubmit: SubmitHandler<NewUserSchemaType> = async (data) => {
        const res = await signIn('onboard', {
            name: data?.name,
            birthday,
            password: data?.password,
            callbackUrl: `${process.env.NEXT_PUBLIC_ORIGIN}/`
        })
        if (res?.error) {
            toast({
                title: "Failed",
                description: "Failed to continue please verify the errors."
            })
        }
    }

    return (
        <div>
            <p className="lg:text-3xl text-2xl font-bold pb-4">Tell us about you!</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <fieldset>
                    <Label htmlFor="name">
                        Full name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        {...register("name")}
                    />
                </fieldset>
                <BirthdayField setBirthday={setBirthday}/>
                <fieldset>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            required
                            type={showPassword ? "text" : "password" }
                            placeholder="********"
                            {...register("password")}
                        />
                        {showPassword ?
                              <IconEyeOff className={passwordIconClass} onClick={() => toggleShowPassword()} />
                            : <IconEye className={passwordIconClass} onClick={() => toggleShowPassword()}/>
                        }
                    </div>
                </fieldset>
                <div className="flex justify-end py-3">
                    <Button type="submit" loading={isSubmitting.toString()}>
                        Complete
                    </Button>
                </div>
            </form>
        </div>
    )
}