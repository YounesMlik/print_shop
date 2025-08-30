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
                    <SelectItem value="popular">Popularity</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="alpha">Alphabetical</SelectItem>
                </SelectContent>
            </Select>

            <Button
                type="button"
                variant="outline"
                onClick={toggleDir}
                aria-label={`Sort ${dir === "asc" ? "ascending" : "descending"}`}
            >

                {dir === "asc"
                    ? (
                        sort === "popular" && <ArrowUpNarrowWide className="h-4 w-4" /> ||
                        sort === "date" && <CalendarArrowUp className="h-4 w-4" /> ||
                        sort === "alpha" && <ArrowUpZA className="h-4 w-4" />
                    )
                    : (
                        sort === "popular" && <ArrowDownWideNarrow className="h-4 w-4" /> ||
                        sort === "date" && <CalendarArrowDown className="h-4 w-4" /> ||
                        sort === "alpha" && <ArrowDownAZ className="h-4 w-4" />
                    )
                }


                <span className="ml-2 hidden sm:inline">
                    {clsx(
                        dir === "asc"
                            ? [
                                sort === "popular" && "Least Popular",
                                sort === "date" && "Oldest to newest",
                                sort === "alpha" && "Z to A",
                            ]
                            : [
                                sort === "popular" && "Most Popular",
                                sort === "date" && "Newest to oldest",
                                sort === "alpha" && "A to Z",
                            ]
                    )}
                </span>
            </Button>
        </div>
    );
}
