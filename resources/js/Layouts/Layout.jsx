import { MainNav } from '@/components/navigation-menu'

export default function Layout({ children }) {
    return (
        <>
            <header className="border-b px-4 py-2">
                <MainNav />
            </header>
            <main className="container mx-auto px-4 py-4">
                <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
                    {/* Soft background accents */}
                    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                        <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
                    </div>
                    {children}
                </div>
            </main>
        </>
    )
}
