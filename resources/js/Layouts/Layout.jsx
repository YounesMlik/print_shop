import { MainNav } from '@/components/navigation-menu'

export default function Layout({ children }) {
    return (
        <>
            <header className="border-b px-4 py-2">
                <MainNav />
            </header>
            <main className="container mx-auto px-4 py-4">
                {children}
            </main>
        </>
    )
}
