import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Link, usePage } from "@inertiajs/react"
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/language-switcher";
import WhatsappButton from "@/components/whatsapp-button";

export function MainNav() {
    const { t } = useTranslation();
    const super_categories = usePage().props.navigation?.super_categories.data || []
    const whatsapp_phone_number = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER

    return (
        <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
            <div className="container mx-auto px-4 py-4 z-20 flex items-center justify-between">
                <Link href={route('home.index')} className="flex items-center gap-2">
                    <img src="/img/under_print_icon.svg" className="h-9 w-9 rounded-2xl bg-primary/10" />
                    <span className="font-semibold tracking-tight">{import.meta.env.VITE_APP_NAME}</span>
                </Link>

                <NavigationMenu delayDuration={0}>
                    <NavigationMenuList className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent">
                                <NavigationMenuLink asChild>
                                    <Link href={route('products.index')}>
                                        {t("products")}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="px-4 min-w-[300px] max-h-[400px] overflow-y-auto">
                                <Accordion type="single" collapsible className="w-full">
                                    {super_categories.map((super_category) => (
                                        <AccordionItem key={super_category.id} value={`sc-${super_category.id}`}>
                                            <AccordionTrigger className="text-sm font-semibold text-muted-foreground">

                                                <NavigationMenuLink asChild>
                                                    <Link href={route('products.index', { super_category: super_category.id, })} >
                                                        {super_category.name}
                                                    </Link>
                                                </NavigationMenuLink>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="space-y-1">
                                                    {super_category.categories.map((category) => (
                                                        <li key={category.id}>
                                                            <NavigationMenuLink asChild>
                                                                <Link href={route('products.index', { category: category.id })}>
                                                                    {category.name}
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href={route('custom_order.index')} className="text-sm">
                                    {t("custom_order")}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <WhatsappButton />
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <LanguageSwitcher />
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex items-center gap-2">
                </div>
            </div>
        </header>
    )
} 
