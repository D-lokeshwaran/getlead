import { TopNav, Footer } from "@/shared/layoutComponents";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="layout-content-container">
            <TopNav/>
            {children}
            <Footer/>
        </div>
    )
}