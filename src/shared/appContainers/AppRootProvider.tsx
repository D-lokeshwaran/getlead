"use client";

import { Session } from "next-auth";
// import { useTheme } from "next-themes";
import React from "react";
import { SessionProvider } from "next-auth/react";

type NextAuthProvider = {
  children: React.ReactNode;
  session?: Session | null;
};

const RootProvider = ({ children, session }: NextAuthProvider) => {
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
