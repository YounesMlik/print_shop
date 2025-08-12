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

export function MainNav() {
    const superCategories = usePage().props.navigation?.superCategories || []

    return (
        <NavigationMenu delayDuration={0} className="z-10">
            <NavigationMenuList>

                <NavigationMenuItem>
                    <NavigationMenuLink href="/">
                        <Link href={route('home.index')}>
                            Home
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>
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
                    <Link href={route('custom_order.index')}>
                        Custom Order
                    </Link>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}
