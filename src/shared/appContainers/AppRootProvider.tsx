"use client";

import { Session } from "next-auth";
// import { useTheme } from "next-themes";
import React, { useLayoutEffect } from "react";
import { SessionProvider } from "next-auth/react";
import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import { useRouter } from "next/navigation";
import User from "@/utils/mongoLib/models/user";

type NextAuthProvider = {
  children: React.ReactNode;
  session?: Session | null;
};

const RootProvider = ({ children, session }: NextAuthProvider) => {

    const router = useRouter()

    //const { theme } = useTheme();
    useLayoutEffect(() => {
        console.log(session);
    }, [])



    return (
        <main>
            <SessionProvider session={session}>{children}</SessionProvider>
        </main>
    );
};

export const AppRootProvider = ({ children, session }: NextAuthProvider) => {
  return (
    <RootProvider key={"1"} session={session}>
      {children}
    </RootProvider>
  );
};
