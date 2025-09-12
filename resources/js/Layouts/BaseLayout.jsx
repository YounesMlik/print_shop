import { LanguageSwitcher } from '@/components/language-switcher'
import { MainNav } from '@/components/navigation-menu'
import { ScrollToTop } from '@/components/ui/_scroll-to-top'
import { Separator } from '@/components/ui/separator'
import { ChevronUp, Info, Mail, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Footer from '../components/footer'

export default function BaseLayout({ children }) {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">

                <TopBar />

                <MainNav />

                <main className="mx-auto">
                    {/* Soft background accents */}
                    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                        <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
                    </div>
                    {children}
                </main>

                <Footer />


                <ScrollToTop minHeight={20} className="fixed right-4 bottom-4">
                    <ChevronUp />
                </ScrollToTop>
            </div>
        </>
    )
}

function TopBar() {
    const { t } = useTranslation();
    const email = "underprintmaroc@gmail.com"
    return (
        <div className='flex flex-col md:flex-row gap-3 items-center bg-blue-600 p-3 text-sm justify-around'>
            <div className='flex gap-4 items-center h-5'>
                <div className='flex gap-2'>
                    <Phone />
                    <span>(+212) 660-630-814</span>
                </div>
                <Separator orientation="vertical" className='bg-white' />
                <a href={`mailto:${email}`} className='flex gap-2'>
                    <Mail />
                    <span>{email}</span>
                </a>
            </div>

            <div className='flex flex-row-reverse md:flex-row gap-2 items-center'>
                <span className='text-sm'>{t("TopBar.Orders of 500Dhs+ Get Free Shipping")}</span>
                <Info />
            </div>
            {/* <Separator orientation='vertical'/> */}
        </div>
    )
}