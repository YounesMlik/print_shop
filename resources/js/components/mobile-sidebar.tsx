import { useTranslation } from "react-i18next"
import { Link } from "@inertiajs/react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetHeader,
    SheetDescription
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import WhatsappButton from "@/components/whatsapp-button"
import { LanguageSwitcher } from "@/components/language-switcher"
import under_print_logo_transparent from "/public/img/under_print_logo_transparent.png";
import { ShoppingCartSheet } from "@/components/shopping-cart/shopping-cart-sheet"

export default function MobileSidebar({ superCategories }: { superCategories: SuperCategory[] }) {
    const { t, i18n } = useTranslation()

    // @ts-ignore
    const app_name = import.meta.env.VITE_APP_NAME

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                    <Menu />
                </Button>
            </SheetTrigger>

            <SheetContent side={i18n.dir() === "rtl" ? "right" : "left"} className="w-[85vw] sm:w-[360px] p-4">

                <SheetHeader>
                    <SheetTitle>
                        <Link href={route("home.index")} className="flex items-center gap-2">
                            <img src={under_print_logo_transparent} className="h-12" />
                        </Link>
                    </SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>

                <nav className="flex flex-col gap-4 text-sm">
                    <Link href={route("products.index")} className="font-medium">
                        {t("products")}
                    </Link>

                    <div className="rounded-lg border">
                        <Accordion type="single" collapsible className="w-full">
                            {superCategories.map((sc) => (
                                <AccordionItem key={sc.id} value={`msc-${sc.id}`}>
                                    <AccordionTrigger className="px-3 text-sm">
                                        <Link
                                            href={route("super-categories.show", { super_category: sc.id })}
                                            className="font-medium"
                                        >
                                            {sc.name}
                                        </Link>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-3 pb-3">
                                        <ul className="space-y-2">
                                            {sc.categories?.map((c) => (
                                                <li key={c.id}>
                                                    <Link
                                                        href={route("categories.show", { category: c.id })}
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

                    <div>
                        <WhatsappButton />
                    </div>

                    <div>
                        <LanguageSwitcher />
                    </div>
                    <div>
                        <ShoppingCartSheet />
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    )
}