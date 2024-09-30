'use client';

import { Button } from "@/shared/components";
import { IconCamera } from "@tabler/icons-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog"
import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
// import BirthdayField from "@/shared/components/BirthdayField";
// import { DatePickerForm } from "@/shared/components/DobForm";
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, SignInResponse } from "next-auth/react";
// import { useState } from 'react';
import { useToast } from "@/shadcn/hooks/use-toast";
import { z } from "zod";

export const UserDetailsSchema = z.object({
    name: z.string().trim(),
    //birthday: z.string().trim()
})
export type UserDetailsSchemaType = z.infer<typeof UserDetailsSchema>;

export default function UserDetailsDialog({
    open,
    onClose,
    onDelete
}: {
    open: boolean,
    onClose: () => void,
    onDelete: () => void
}) {
    const { data: session } = useSession();
    const user = session?.user;
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<UserDetailsSchemaType>({
        resolver: zodResolver(UserDetailsSchema),
        defaultValues: {
            name: user?.name as string,
            //birthday: '' as string
        }
    });
    const { toast } = useToast();
    //const [ birthday,setBirthday ] = useState(user?.birthday);

    const onSubmit: SubmitHandler<UserDetailsSchemaType> = async (data) => {
        const res: SignInResponse | undefined = await signIn('onboard', {
            name: data?.name,
            //birthday,
        })
        if (res?.error) {
            toast({
                title: "Failed",
                description: "Failed to continue please verify the errors."
            })
        } else {
            onClose();
        }
    }

    return (
        <Dialog open={open || false} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Account Settings</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-center justify-center flex-col">
                            <div className="relative py-2">
                                <Image
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full"
                                    height={114}
                                    width={114}
                                    src={user?.image || "/icons/default-user.svg"}
                                    alt={`${user?.name} profile`}
                                    referrerPolicy="no-referrer"
                                />
                                <div className="flex justify-center items-center absolute right-0 top-0 bg-secondary min-h-8 min-w-8 rounded-full cursor-pointer">
                                    <IconCamera className="text-[#5a5a5a]"/>
                                </div>
                            </div>
                            <div className="font-bold text-[#000000] leading-normal">{user?.name}</div>
                            <div className="text-[#999999] text-sm">{user?.email}</div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <fieldset>
                                <Label htmlFor="name">
                                    Full name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("name")}
                                />
                            </fieldset>
                            {/* <BirthdayField
                                setBirthday={setBirthday}
                                birthday={new Date(user?.birthday)}
                            /> */}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" type="button" onClick={onDelete} disabled={isSubmitting}>Delete my account</Button>
                        <Button type="reset" onClick={onClose}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="success"
                            loading={isSubmitting.toString()}
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
