'use client';

import { Button } from "@/shared/components";
import { IconAlertTriangle } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shadcn/components/ui/alert";
import deleteAccount from "@/app/actions/deleteAccount";
import { useSession, signOut } from "next-auth/react";
import { useToast } from "@/shadcn/hooks/use-toast"
import Image from 'next/image';

export default function ConfirmDeleteDialog({
    open,
    onClose,
}: {
    open: boolean,
    onClose: () => void
}) {
    const { data: session } = useSession();
    const user = session?.user;
    const { toast } = useToast();

    const handleDeleteAccount = async () => {
        await deleteAccount(user?.email as string)
            .then(res => {
                if ([400, 500].includes(res.status)) {
                    toast({
                        variant: "destructive",
                        title: "Failed to Delete Account",
                        description: res.message
                    })
                } else {
                    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_ORIGIN}/account-deleted` });
                    toast({
                        title: "Account Deleted",
                        description: res.message
                    })
                }
            })
    }

    return (
        <Dialog open={open || false} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl">Delete your getlead Account</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <p>Your account:</p>
                    <Alert variant="destructive">
                        <AlertTitle className="flex justify-between">
                            <div className="flex gap-2 items-start">
                                <Image
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-7"
                                    src={user?.image || "/icons/default-user.svg"}
                                    height={24}
                                    width={24}
                                    referrerPolicy="no-referrer"
                                    alt={`${user?.name} profile`}
                                />
                                <div className="flex flex-col">
                                    <h1 className="text-[#000000] font-medium leading-normal">{user?.name}</h1>
                                    <h1 className="text-[#999999] text-[0.8rem] font-normal leading-normal">{user?.email}</h1>
                                </div>
                            </div>
                        </AlertTitle>
                        <AlertDescription>
                            <IconAlertTriangle size="13" className="inline-block"/> You will lose access to any leads shared with your account
                        </AlertDescription>
                    </Alert>
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        variant="secondary"
                        className="text-[#e7a1a1] hover:text-[red]"
                        onClick={handleDeleteAccount}
                    >
                        Yes delete my account
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
