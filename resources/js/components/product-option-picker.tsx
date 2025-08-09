import * as React from "react";
import { cn } from "@/lib/utils"; // optional: replace with your own cx helper
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Dynamic Variant Picker
 * --------------------------------------------------
 * A reusable picker for product option groups (e.g., Size, Color).
 * - Supports dynamic option group types: "button", "swatch", "select".
 * - Disables (or hides) impossible combinations based on available variants.
 * - Returns the best matching variant when a full, valid selection is made.
 * - Designed for Laravel + Inertia + React + shadcn.
 *
 * Drop-in usage:
 * <VariantPicker
 *   groups={groups}
 *   variants={variants}
 *   onChange={(selection, matched) => console.log(selection, matched)}
 * />
 */

// ---------- Types ----------
export type OptionValue = {
    id: string; // stable id used in variant mapping
    label: string;
    value?: string; // optional raw value
    colorHex?: string; // used for swatch type
};

export type OptionGroup = {
    id: string; // stable key used across variants (e.g., "size", "color")
    name: string; // display label (e.g., "Size")
    type: "button" | "swatch" | "select";
    options: OptionValue[];
};

export type Variant = {
    id: string;
    // Map of group.id -> optionValue.id
    options: Record<string, string>;
    price?: number;
    stock?: number; // optional, treat > 0 as available
    available?: boolean; // optional explicit availability flag
};

export type Selection = Record<string, string | undefined>; // group.id -> optionValue.id

export type VariantPickerProps = {
    groups: OptionGroup[];
    variants: Variant[];
    value?: Selection; // controlled
    defaultValue?: Selection; // uncontrolled
    onChange?: (selection: Selection, matchedVariant: Variant | null) => void;
    /**
     * If true, when a group has exactly one enabled option, it will be auto-selected.
     */
    autoSelectSingle?: boolean;
    /**
     * What to do with options that are not possible with the current partial selection.
     */
    unavailableStrategy?: "disable" | "hide";
};

// ---------- Helpers ----------
const isVariantAvailable = (v: Variant) => {
    if (typeof v.available === "boolean") return v.available;
    if (typeof v.stock === "number") return v.stock > 0;
    return true; // default: available
};

const selectionIsComplete = (sel: Selection, groups: OptionGroup[]) =>
    groups.every((g) => !!sel[g.id]);

const findExactVariant = (
    sel: Selection,
    variants: Variant[],
    groups: OptionGroup[]
): Variant | null => {
    if (!selectionIsComplete(sel, groups)) return null;
    const idMatches = variants.find(
        (v) =>
            isVariantAvailable(v) &&
            groups.every((g) => v.options[g.id] === sel[g.id])
    );
    return idMatches ?? null;
};

/**
 * Compute the set of enabled option ids for a given group, under a partial selection.
 */
const enabledOptionsForGroup = (
    targetGroupId: string,
    selection: Selection,
    variants: Variant[],
    groups: OptionGroup[]
): Set<string> => {
    const enabled = new Set<string>();

    // Consider each option id for the target group. It's enabled if there's at least
    // one available variant consistent with *all other selected* groups.
    const otherGroupIds = groups.map((g) => g.id).filter((id) => id !== targetGroupId);

    for (const v of variants) {
        if (!isVariantAvailable(v)) continue;

        // Check if variant matches all other selected groups
        let matchesOthers = true;
        for (const gid of otherGroupIds) {
            const wanted = selection[gid];
            if (wanted && v.options[gid] !== wanted) {
                matchesOthers = false;
                break;
            }
        }
        if (!matchesOthers) continue;

        // If it matches others, record the option present in target group
        const optionId = v.options[targetGroupId];
        if (optionId) enabled.add(optionId);
    }

    return enabled;
};

/**
 * Given a selection and a change in one group, drop conflicting chosen options in other groups
 * so that the selection always corresponds to at least one available variant (if possible).
 */
const normalizeSelection = (
    next: Selection,
    variants: Variant[],
    groups: OptionGroup[]
): Selection => {
    let sel: Selection = { ...next };

    // Iterate until stable: if any chosen option is impossible, unset it.
    let changed = true;
    while (changed) {
        changed = false;
        for (const g of groups) {
            const chosen = sel[g.id];
            if (!chosen) continue;
            const enabled = enabledOptionsForGroup(g.id, sel, variants, groups);
            if (!enabled.has(chosen)) {
                sel = { ...sel, [g.id]: undefined };
                changed = true;
            }
        }
    }
    return sel;
};

// ---------- UI Controls ----------
function GroupHeader({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">{title}</Label>
        </div>
    );
}

function Swatch({ colorHex, selected }: { colorHex?: string; selected?: boolean }) {
    return (
        <div
            className={cn(
                "h-7 w-7 rounded-full border",
                selected ? "ring-2 ring-offset-2" : "ring-0",
                "transition-all"
            )}
            style={{ backgroundColor: colorHex || "#e5e7eb" }}
        />
    );
}

function GroupControl(props: {
    group: OptionGroup;
    selection: Selection;
    onSelect: (optionId: string | undefined) => void;
    enabledIds: Set<string>;
    strategy: "disable" | "hide";
}) {
    const { group, selection, onSelect, enabledIds, strategy } = props;
    const selectedId = selection[group.id];

    if (group.type === "select") {
        const visibleOptions = group.options.filter((o) =>
            strategy === "hide" ? enabledIds.has(o.id) : true
        );

        return (
            <div className="space-y-2">
                <GroupHeader title={group.name} />
                <Select
                    value={selectedId}
                    onValueChange={(v) => onSelect(v)}
                // allow clearing by choosing placeholder again if needed
                >
                    <SelectTrigger>
                        <SelectValue placeholder={`Choose ${group.name}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {visibleOptions.map((o) => (
                            <SelectItem key={o.id} value={o.id} disabled={!enabledIds.has(o.id)}>
                                {o.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    }

    if (group.type === "swatch") {
        return (
            <div className="space-y-2">
                <GroupHeader title={group.name} />
                <TooltipProvider>
                    <div className="flex flex-wrap gap-2">
                        {group.options.map((o) => {
                            const enabled = enabledIds.has(o.id);
                            if (strategy === "hide" && !enabled) return null;
                            const selected = selectedId === o.id;
                            return (
                                <Tooltip key={o.id}>
                                    <TooltipTrigger asChild>
                                        <button
                                            type="button"
                                            onClick={() => onSelect(o.id)}
                                            disabled={!enabled}
                                            className={cn(
                                                "p-0.5 rounded-full border disabled:opacity-40 disabled:cursor-not-allowed",
                                                selected && "ring-2 ring-offset-2"
                                            )}
                                            aria-pressed={selected}
                                            aria-label={o.label}
                                        >
                                            <Swatch colorHex={o.colorHex} selected={selected} />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>{o.label}</TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </div>
                </TooltipProvider>
            </div>
        );
    }

    // default: "button"
    return (
        <div className="space-y-2">
            <GroupHeader title={group.name} />
            <div className="flex flex-wrap gap-2">
                {group.options.map((o) => {
                    const enabled = enabledIds.has(o.id);
                    if (strategy === "hide" && !enabled) return null;
                    const selected = selectedId === o.id;
                    return (
                        <Button
                            key={o.id}
                            type="button"
                            variant={selected ? "default" : "outline"}
                            className={cn(
                                "h-9 px-3",
                                !enabled && "opacity-40 cursor-not-allowed line-through"
                            )}
                            onClick={() => onSelect(o.id)}
                            disabled={!enabled}
                            aria-pressed={selected}
                        >
                            {o.label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}

// ---------- Main Component ----------
export function VariantPicker({
    groups,
    variants,
    value,
    defaultValue,
    onChange,
    autoSelectSingle = true,
    unavailableStrategy = "disable",
}: VariantPickerProps) {
    const [internal, setInternal] = React.useState<Selection>(defaultValue ?? {});
    const controlled = typeof value !== "undefined";
    const selection = controlled ? (value as Selection) : internal;

    // Compute enabled option ids per group for current partial selection
    const enabledPerGroup = React.useMemo(() => {
        const map = new Map<string, Set<string>>();
        for (const g of groups) {
            map.set(g.id, enabledOptionsForGroup(g.id, selection, variants, groups));
        }
        return map;
    }, [groups, selection, variants]);

    // Auto-select single enabled options
    React.useEffect(() => {
        if (!autoSelectSingle) return;
        let next: Selection = { ...selection };
        let changed = false;

        for (const g of groups) {
            const sel = next[g.id];
            const enabled = enabledPerGroup.get(g.id)!;
            if (!sel && enabled.size === 1) {
                next[g.id] = Array.from(enabled)[0];
                changed = true;
            }
        }

        if (changed) {
            const normalized = normalizeSelection(next, variants, groups);
            if (!controlled) setInternal(normalized);
            onChange?.(normalized, findExactVariant(normalized, variants, groups));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoSelectSingle, enabledPerGroup]);

    const handleSelect = (groupId: string, optionId?: string) => {
        const next = normalizeSelection({ ...selection, [groupId]: optionId }, variants, groups);
        if (!controlled) setInternal(next);
        onChange?.(next, findExactVariant(next, variants, groups));
    };

    const matched = findExactVariant(selection, variants, groups);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-base">Choose Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {groups.map((group) => (
                    <GroupControl
                        key={group.id}
                        group={group}
                        selection={selection}
                        onSelect={(id) => handleSelect(group.id, id)}
                        enabledIds={enabledPerGroup.get(group.id)!}
                        strategy={unavailableStrategy}
                    />
                ))}

                {/* Example display of matched variant */}
                <div className="pt-2 text-sm text-muted-foreground">
                    {matched ? (
                        <div>
                            <span className="font-medium text-foreground">Variant:</span> {matched.id}
                            {typeof matched.price === "number" && (
                                <span> • {(matched.price / 100).toFixed(2)}€</span>
                            )}
                            {typeof matched.stock === "number" && (
                                <span> • Stock: {matched.stock}</span>
                            )}
                        </div>
                    ) : (
                        <span>Pick all required options to see availability.</span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

// ---------- Demo Wrapper (remove in production) ----------
export function VariantPickerDemo() {
    const groups: OptionGroup[] = [
        {
            id: "size",
            name: "Size",
            type: "button",
            options: [
                { id: "xs", label: "XS" },
                { id: "s", label: "S" },
                { id: "m", label: "M" },
                { id: "l", label: "L" },
            ],
        },
        {
            id: "color",
            name: "Color",
            type: "swatch",
            options: [
                { id: "red", label: "Red", colorHex: "#ef4444" },
                { id: "blue", label: "Blue", colorHex: "#3b82f6" },
                { id: "black", label: "Black", colorHex: "#111827" },
            ],
        },
        {
            id: "finish",
            name: "Finish",
            type: "select",
            options: [
                { id: "matte", label: "Matte" },
                { id: "glossy", label: "Glossy" },
            ],
        },
    ];

    const variants: Variant[] = [
        { id: "v1", options: { size: "s", color: "red", finish: "matte" }, price: 2999, stock: 5 },
        { id: "v2", options: { size: "s", color: "red", finish: "glossy" }, price: 3099, stock: 0 },
        { id: "v3", options: { size: "m", color: "red", finish: "matte" }, price: 2999, stock: 2 },
        { id: "v4", options: { size: "m", color: "blue", finish: "glossy" }, price: 3099, stock: 1 },
        { id: "v5", options: { size: "l", color: "black", finish: "matte" }, price: 2999, stock: 3 },
    ];

    const [selection, setSelection] = React.useState<Selection>({});
    const [matched, setMatched] = React.useState<Variant | null>(null);

    return (
        <div className="max-w-xl mx-auto p-4">
            <VariantPicker
                groups={groups}
                variants={variants}
                value={selection}
                onChange={(sel, v) => {
                    setSelection(sel);
                    setMatched(v);
                }}
                unavailableStrategy="disable"
            />

            <pre className="mt-4 p-3 bg-muted rounded text-xs overflow-auto">
                {JSON.stringify({ selection, matched }, null, 2)}
            </pre>
        </div>
    );
}
