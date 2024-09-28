import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/nextAuth/authOptions";
import Dashboard from "@/app/(dashboard)";
import Home from "@/app/(home)";

export default async function App() {

    const session = await getServerSession(authOptions);

    if (session) {
        return <Dashboard/>
    }

    return (
        <Home/>
    )
}