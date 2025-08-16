import * as React from "react"
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
import { NavigationMenuSub } from "@radix-ui/react-navigation-menu"
import { cn } from "@/lib/utils"
import { Link, usePage } from "@inertiajs/react"
import { Sparkles } from "lucide-react"

export function MainNav() {
    const superCategories = usePage().props.navigation?.superCategories || []

    return (
        <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
            <div className="container mx-auto px-4 py-4 z-20 flex items-center justify-between">
                <Link href={route('home.index')} className="flex items-center gap-2">
                    <div className="grid place-content-center h-9 w-9 rounded-2xl bg-primary/10">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-semibold tracking-tight">{import.meta.env.VITE_APP_NAME}</span>
                </Link>

                <NavigationMenu delayDuration={0}>
                    <NavigationMenuList className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent">
                                <NavigationMenuLink asChild>
                                    <Link href={route('products.index')}>
                                        Products
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="px-4 min-w-[300px] max-h-[400px] overflow-y-auto">
                                <Accordion type="single" collapsible className="w-full">
                                    {superCategories.map((superCategory) => (
                                        <AccordionItem key={superCategory.id} value={`sc-${superCategory.id}`}>
                                            <AccordionTrigger className="text-sm font-semibold text-muted-foreground">

                                                <NavigationMenuLink asChild>
                                                    <Link href={route('products.index', { super_category: superCategory.id, })} >
                                                        {superCategory.name}
                                                    </Link>
                                                </NavigationMenuLink>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="space-y-1">
                                                    {superCategory.children.map((category) => (
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
                                    Custom Order
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex items-center gap-2">
                </div>
            </div>
        </header>
    )
}
