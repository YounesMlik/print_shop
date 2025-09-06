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
import under_print_wordmark_transparent from "/public/img/under_print_wordmark_transparent.svg";
import WhatsappButton from "@/components/whatsapp-button";
import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import { Divider } from "@mui/material";


export default function Footer({ className, super_categories, ...props }) {
    const { t, i18n } = useTranslation();
    // @ts-ignore
    const app_name = import.meta.env.VITE_APP_NAME

    return (
        <footer
            className={cn("bg-black border-t py-18 px-36", className)}
            {...props}
        >
            <div className="flex flex-col gap-10">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-4 items-start basis-1/3">
                        <img src={under_print_wordmark_transparent} alt={app_name} className="h-16 mb-4" />
                        <p>
                            {t("footer.description")}
                        </p>
                        <ul className="flex gap-6 text-semibold">
                            <li>
                                {t("footer.links.about_us")}
                            </li>
                            <li>
                                {t("footer.links.online_store")}
                            </li>
                            <li>
                                {t("footer.links.custom_order")}
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4 justify-around items-end">
                        <WhatsappButton className="px-8 h-18" />
                        <ul className="flex gap-4">
                            <li>
                                <a href="">
                                    <Instagram className="text-white" fontSize="large" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <Facebook className="text-white" fontSize="large" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <WhatsApp className="text-white" fontSize="large" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <Separator />
                <p>
                    {t("footer.copyright")}
                </p>
            </div>
        </footer>
    )
}
