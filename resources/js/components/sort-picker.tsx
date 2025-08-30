// resources/js/components/SortPicker.tsx
import * as React from "react";
import { router, usePage } from "@inertiajs/react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    ArrowDownZA,
    ArrowUpAZ,
    CalendarArrowDown,
    CalendarArrowUp,
    ArrowDownWideNarrow,
    ArrowUpNarrowWide,
    ArrowDownAZ,
    ArrowUpZA,
} from "lucide-react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";

type Sort = "popular" | "date" | "alpha";
type Direction = "asc" | "desc";

type Props = {
    className?: string;
    // Optionally hydrate from server (e.g. props.filters.sort / props.filters.dir)
    initialSort?: Sort;
    initialDir?: Direction;
};

function parseQuery(url: string) {
    const qs = url.includes("?") ? url.split("?")[1] : "";
    const params = new URLSearchParams(qs);
    const data: Record<string, any> = {};
    params.forEach((value, key) => {
        const name = key.endsWith("[]") ? key.slice(0, -2) : key;
        if (data[name] === undefined) data[name] = value;
        else if (Array.isArray(data[name])) (data[name] as string[]).push(value);
        else data[name] = [data[name], value];
    });
    return data;
}

export default function SortPicker({ className, initialSort, initialDir }: Props) {
    const { t } = useTranslation();
    const page = usePage();
    const path = page.url.split("?")[0];

    const query = React.useMemo(() => parseQuery(page.url), [page.url]);
    const [sort, setSort] = React.useState<Sort>(
        (query.sort as any) || initialSort || "popular",
    );
    const [dir, setDir] = React.useState<Direction>(
        (query.dir as any) || initialDir || "desc",
    );

    const visit = React.useCallback(
        (next: Partial<{ sort: string; dir: string }>) => {
            const data = { ...query, ...next };
            delete (data as any).page; // reset pagination on sort change
            router.get(path, data, { preserveScroll: true, preserveState: true, replace: true });
        },
        [path, query],
    );

    const onSortChange = (value: Sort) => {
        setSort(value);
        visit({ sort: value });
    };

    const toggleDir = () => {
        const next = dir === "asc" ? "desc" : "asc";
        setDir(next);
        visit({ dir: next });
    };

    return (
        <div className={clsx("flex items-center gap-2", className)}>
            <Select value={sort} onValueChange={onSortChange}>
                <SelectTrigger className="w-44">
                    <SelectValue placeholder="Sort by…" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="popular">{t("SortPicker.sort.popular")}</SelectItem>
                    <SelectItem value="date">{t("SortPicker.sort.date")}</SelectItem>
                    <SelectItem value="alpha">{t("SortPicker.sort.alpha")}</SelectItem>
                </SelectContent>
            </Select>

            <Button
                type="button"
                variant="outline"
                onClick={toggleDir}
                aria-label={`Sort ${dir === "asc" ? "ascending" : "descending"}`}
            >

                {sort_icons[dir][sort]}

                <span className="ml-2 hidden sm:inline">
                    {t(`SortPicker.dir.${dir}.${sort}`)}
                </span>
            </Button>
        </div>
    );
}


const sort_icons = {
    "asc": {
        "popular": <ArrowUpNarrowWide className="h-4 w-4" />,
        "date": <CalendarArrowUp className="h-4 w-4" />,
        "alpha": <ArrowUpZA className="h-4 w-4" />,
    },
    "desc": {
        "popular": <ArrowDownWideNarrow className="h-4 w-4" />,
        "date": <CalendarArrowDown className="h-4 w-4" />,
        "alpha": <ArrowDownAZ className="h-4 w-4" />,
    },
}