'use client';

import { SideNav, PageHeader } from "@/shared/layoutComponents";
import { useSmallScreen } from "@/shared/hooks";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const isSmallScreen = useSmallScreen();

    return (
        <div className="layout-content-container">
            <div className="flex flex-col md:flex-row">
                {isSmallScreen ?
                    <PageHeader/>
                    : <SideNav/>
                }
                <div className="p-2 md:overflow-y-auto md:p-2 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
