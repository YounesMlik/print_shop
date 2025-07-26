import { MainNav } from '@/components/navigation-menu'

export default function Layout({ children }) {
    return (
        <>
            <header className="border-b px-4 py-2">
                <MainNav />
            </header>
            <div className="container mx-auto px-4 py-4">
                <main className="container mx-auto px-4 py-6">{children}</main>
            </div>
        </>
    )
}
