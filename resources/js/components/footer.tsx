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
import { makeWhatsappMessageUrl } from "@/components/helpers";


export default function Footer({ className, super_categories, ...props }) {
    const { t, i18n } = useTranslation();
    // @ts-ignore
    const app_name = import.meta.env.VITE_APP_NAME

    return (
        <footer
            className={cn("bg-black border-t py-18 px-10 sm:px-20 md:px-28 lg:px-36", className)}
            {...props}
        >
            <div className="flex flex-col gap-10">
                <div className="flex justify-between gap-8 flex-col md:flex-row">
                    <div className="flex flex-col gap-4 items-start basis-1/3">
                        <img src={under_print_wordmark_transparent} alt={app_name} className="h-16 mb-4" />
                        <p>
                            {t("footer.description")}
                        </p>
                        <ul className="flex gap-6 font-semibold flex-col sm:flex-row">
                            <li>
                                <Link href={route("home.index") + "#about_us"}>
                                    {t("footer.links.about_us")}
                                </Link>
                            </li>
                            <li>
                                <Link href={route("products.index")}>
                                    {t("footer.links.online_store")}
                                </Link>
                            </li>
                            <li>
                                <Link href={route("custom_order.index")}>
                                    {t("footer.links.custom_order")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4 justify-around items-end">
                        <WhatsappButton className="px-8 h-18" />
                        <ul className="flex gap-4">
                            {/* <li>
                                <a href="" target="_blank">
                                    <Instagram className="text-white" fontSize="large" />
                                </a>
                            </li> */}
                            <li>
                                <a href="https://www.facebook.com/people/Under-print/61570942541154" target="_blank">
                                    <Facebook className="text-white" fontSize="large" />
                                </a>
                            </li>
                            <li>
                                <a href={makeWhatsappMessageUrl()} target="_blank">
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
