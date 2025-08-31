import { makeWhatsappMessageUrl } from "@/components/helpers";
import { useTranslation } from "react-i18next";
import Whatsapp_logo from "/public/img/Whatsapp_logo.svg";
import { cn } from "@/lib/utils";

export default function WhatsappButton({ className, ...props }) {
    const { t } = useTranslation();

    return (
        <a
            href={makeWhatsappMessageUrl()}
            target="_blank"
            className={cn("flex flex-row items-center h-12 bg-green-600 hover:bg-green-600/90 text-sm text-white rounded-sm transition-all", className)}
            {...props}
        >
            <span className="ps-2 text-md font-semibold">
                {t("nav.contact_us_via")}
            </span>
            <img src={Whatsapp_logo} className="max-h-full" />
        </a>
    )
}