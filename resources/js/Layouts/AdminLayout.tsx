import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from '@/components/ui/navigation-menu';

import { ChevronLeftIcon } from "lucide-react"
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <header className="border-b px-4 py-2">
                <NavigationMenu delayDuration={0} className="z-10" >
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Button asChild className="inline-flex items-center gap-1">
                                <a href={route('filament.admin.pages.dashboard')}>
                                    <ChevronLeftIcon className="w-4 h-4" />
                                    Back to admin panel
                                </a>
                            </Button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu >
            </header>
            <main className="container mx-auto px-4 py-4">
                {children}
            </main>
        </>
    )
}
