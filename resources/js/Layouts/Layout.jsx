import { LanguageSwitcher } from '@/components/language-switcher'
import { MainNav } from '@/components/navigation-menu'
import { ScrollToTop } from '@/components/ui/_scroll-to-top'
import { ChevronUp } from 'lucide-react'

export default function Layout({ children }) {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">

                <MainNav />

                <main className="container mx-auto px-4 py-4">
                    {/* Soft background accents */}
                    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                        <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
                    </div>
                    {children}
                </main>

                <footer id="contact" className="border-t py-8">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
                            <a href="#" className="inline-flex items-center gap-2 text-foreground">

                                <img src="/img/under_print_icon.svg" className="h-8 w-8 rounded-2xl bg-primary/10" />
                                <span className="font-semibold tracking-tight">{import.meta.env.VITE_APP_NAME}</span>
                            </a>
                            <nav className="flex items-center gap-4">
                                <LanguageSwitcher />
                            </nav>
                            {/* <p className="text-xs">© {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}</p> */}
                        </div>
                    </div>
                </footer>


                <ScrollToTop minHeight={20} className="fixed right-4 bottom-4">
                    <ChevronUp />
                </ScrollToTop>
            </div>
        </>
    )
}
