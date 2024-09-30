'use client';

import {
    NavLinks,
    AccountDropdown,
    UserDetailsDialog,
    ConfirmDeleteDialog,
} from './components';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shadcn/components/ui/sheet"
import { useToggle } from '@/shared/hooks';
import { IconAlignLeft } from "@tabler/icons-react";

export default function SideNav({ asSheet }: { asSheet?: boolean | undefined }) {
    const [ openAccountDetails, toggleAccountDetails ] = useToggle();
    const [ openConfirmDelete, toggleConfirmDelete ] = useToggle();

    const handleOnDelete = () => {
        toggleAccountDetails();
        toggleConfirmDelete(true);
    }

    const renderSidebarContent = (
        <>
            <AccountDropdown toggleAccountDetails={toggleAccountDetails}/>
            <UserDetailsDialog
                open={openAccountDetails}
                onClose={() => toggleAccountDetails(false)}
                onDelete={handleOnDelete}
            />
            <ConfirmDeleteDialog
                open={openConfirmDelete}
                onClose={() => toggleConfirmDelete(false)}
            />
            <NavLinks/>
        </>
    )

    if (asSheet) {
        return (
            <Sheet>
                <SheetTrigger className="h-fit md:hidden block">
                    <IconAlignLeft/>
                </SheetTrigger>
                <SheetContent className="p-5" side="left">
                    {renderSidebarContent}
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <div className="flex h-full w-72 flex-col justify-between bg-[#FFFFFF] p-5 hidden md:block">
            <div className="flex flex-col gap-[0.9rem] relative">
                {renderSidebarContent}
            </div>
        </div>
    );
}
