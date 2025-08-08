import { useCallback, useEffect, useMemo, useState } from "react";
import z from "zod";

export function objectMap(object: object, fn: ([string, unknown]) => [string, unknown]) {
    return Object.fromEntries(Object.entries(object).map(fn))
}

export function tryCatch(fn: () => void) {
    let error;
    try {
        fn();
    }
    catch (err) {
        error = err;
    }
    return error;
}

export function tryCatchZod(fn: () => void): string[] {
    let err = tryCatch(fn);
    if (err) {
        return z.treeifyError(err).errors
    } else {
        return []
    }
}

// Reusable hook for any attribute-like field
export function useLocalAttribute<T>({
    value,
    validate,         // (val: T) => string[]  -> empty array means valid
    onCommit,         // (val: T) => void | Promise<void>
}: {
    value: T;
    validate: (val: T) => string[];
    onCommit: (val: T) => void | Promise<void>;
}) {
    const [local, setLocal] = useState<T>(value);
    const [saving, setSaving] = useState(false);

    // keep local in sync when external value changes
    useEffect(() => { setLocal(value); }, [value]);

    const errors = useMemo(() => validate(local), [local, validate]);
    const valid = errors.length === 0;
    const dirty = !Object.is(local, value);

    const reset = useCallback(() => setLocal(value), [value]);

    const save = useCallback(async () => {
        if (!dirty || !valid || saving) return;
        const maybe = onCommit(local);
        if (maybe && typeof (maybe as any).then === "function") {
            try {
                setSaving(true);
                await maybe;
            } finally {
                setSaving(false);
            }
        }
    }, [dirty, valid, saving, onCommit, local]);

    return { local, setLocal, errors, valid, dirty, saving, save, reset };
}