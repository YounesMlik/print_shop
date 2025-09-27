import { LanguageSwitcher } from '@/components/language-switcher'
import { MainNav } from '@/components/navigation-menu'
import { ScrollToTop } from '@/components/ui/_scroll-to-top'
import { Separator } from '@/components/ui/separator'
import BaseLayout from '@/Layouts/BaseLayout'
import { ChevronUp, Info, Mail, Phone } from 'lucide-react'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <BaseLayout>
            <div className="container mx-auto px-4 py-4">
                {children}
            </div>
        </BaseLayout>
    )
}