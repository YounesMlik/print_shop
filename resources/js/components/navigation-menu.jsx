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
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react"
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/language-switcher";
import WhatsappButton from "@/components/whatsapp-button";
import { cn } from "@/lib/utils";
import { ClipboardList, Menu, ShoppingCartIcon } from "lucide-react";

export function MainNav({ className, ...props }) {
    const { t, i18n } = useTranslation()
    const super_categories =
        usePage().props.navigation?.super_categories?.data || []

    return (
        <header
            className={cn(
                "sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50",
                className
            )}
            {...props}
        >
            <div className="container mx-auto px-4 py-4 z-20 flex items-center justify-around">
                <Link href={route("home.index")} className="flex items-center gap-2">
                    <img
                        src="/img/under_print_icon.svg"
                        className="h-9 w-9 rounded-2xl bg-primary/10"
                    />
                    <span className="font-semibold tracking-tight">
                        {import.meta.env.VITE_APP_NAME}
                    </span>
                </Link>

                {/* Desktop nav (unchanged) */}
                <NavigationMenu delayDuration={0}>
                    <NavigationMenuList
                        className="hidden md:flex items-center gap-6 text-sm text-muted-foreground"
                        dir={i18n.dir()}
                    >
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent">
                                <NavigationMenuLink asChild>
                                    <Link href={route("products.index")}>
                                        <div className="flex items-center gap-2">
                                            <ShoppingCartIcon />
                                            {t("products")}
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="px-4 min-w-[300px] max-h-[400px] overflow-y-auto">
                                <Accordion type="single" collapsible className="w-full">
                                    {super_categories.map((super_category) => (
                                        <AccordionItem
                                            key={super_category.id}
                                            value={`sc-${super_category.id}`}
                                        >
                                            <AccordionTrigger className="text-sm font-semibold text-muted-foreground">
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href={route("products.index", {
                                                            super_category: super_category.id,
                                                        })}
                                                    >
                                                        {super_category.name}
                                                    </Link>
                                                </NavigationMenuLink>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="space-y-1">
                                                    {super_category.categories.map((category) => (
                                                        <li key={category.id}>
                                                            <NavigationMenuLink asChild>
                                                                <Link
                                                                    href={route("products.index", {
                                                                        category: category.id,
                                                                    })}
                                                                >
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
                                <Link href={route("custom_order.index")} className="text-sm">
                                    <div className="flex items-center gap-2">
                                        <ClipboardList />
                                        {t("custom_order")}
                                    </div>
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

                {/* Mobile: simple sidebar trigger (new) */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            aria-label="Open menu"
                        >
                            <Menu />
                        </Button>
                    </SheetTrigger>

                    <SheetContent
                        side={i18n.dir() === "rtl" ? "right" : "left"}
                        className="w-[85vw] sm:w-[360px] p-4"
                    >
                        <nav className="flex flex-col gap-4 text-sm">
                            <Link
                                href={route("products.index")}
                                className="font-medium"
                            >
                                {t("products")}
                            </Link>

                            {/* Simple accordion list for categories */}
                            <div className="rounded-lg border">
                                <Accordion type="single" collapsible className="w-full">
                                    {super_categories.map((sc) => (
                                        <AccordionItem key={sc.id} value={`msc-${sc.id}`}>
                                            <AccordionTrigger className="px-3 text-sm">
                                                <Link
                                                    href={route("products.index", {
                                                        super_category: sc.id,
                                                    })}
                                                    className="font-medium"
                                                >
                                                    {sc.name}
                                                </Link>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-3 pb-3">
                                                <ul className="space-y-2">
                                                    {sc.categories.map((c) => (
                                                        <li key={c.id}>
                                                            <Link
                                                                href={route("products.index", {
                                                                    category: c.id,
                                                                })}
                                                                className="text-muted-foreground hover:text-foreground"
                                                            >
                                                                {c.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>

                            <Link href={route("custom_order.index")} className="font-medium">
                                {t("custom_order")}
                            </Link>

                            <div className="pt-2">
                                <WhatsappButton />
                            </div>

                            <div>
                                <LanguageSwitcher />
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}