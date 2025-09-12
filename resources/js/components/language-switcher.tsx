import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { usePage } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";

const languages_labels = {
    fr: "Français",
    ar: "العربية",
};

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const languages = usePage().props.i18n.available;

    const switchTo = (code: string) => {
        // optimistic change, then persist on server and reload back()
        i18n.changeLanguage(code);
        window.location.href = `/locale/${code}`;
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    {i18n.language?.toUpperCase()}
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((l) => (
                    <DropdownMenuItem key={l} onClick={() => switchTo(l)}>
                        {languages_labels[l]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
