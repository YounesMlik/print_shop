import { useTranslation } from "react-i18next";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsDown,
    CornerDownRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from '@/components/language-switcher'
import custom_request_bg from "/public/img/home_page/custom_request_bg.jpg";


export default function Footer({ className, super_categories, ...props }) {
    const { t, i18n } = useTranslation();
    // @ts-ignore
    const app_name = import.meta.env.VITE_APP_NAME

    return (
        <footer
            className={cn("border-t py-8", className)}
            {...props}
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
                    <a href="#" className="inline-flex items-center gap-2 text-foreground">

                        <img src="/img/under_print_icon.svg" className="h-8 w-8 rounded-2xl bg-primary/10" />
                        <span className="font-semibold tracking-tight">{app_name}</span>
                    </a>
                    <nav className="flex items-center gap-4">
                        <LanguageSwitcher />
                    </nav>
                    {/* <p className="text-xs">© {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}</p> */}
                </div>
            </div>
        </footer>
    )
}
