import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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

// add a tiny deepEqual (good enough for primitives/arrays/flat objects)
export function deepEqual(a: any, b: any): boolean {
    if (Object.is(a, b)) return true;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
        return true;
    }
    if (a && b && typeof a === "object" && typeof b === "object") {
        const ak = Object.keys(a), bk = Object.keys(b);
        if (ak.length !== bk.length) return false;
        for (const k of ak) if (!deepEqual(a[k], b[k])) return false;
        return true;
    }
    return false;
}

// Reusable hook for any attribute-like field
export function useLocalAttribute<T>({
    value,
    validate,
    onCommit,
}: {
    value: T;
    validate: (val: T) => string[];
    onCommit: (val: T) => void | Promise<void>;
}) {
    const [local, setLocal] = useState<T>(value);
    const [saving, setSaving] = useState(false);

    // Track the last external value we synced from
    const lastExternalRef = useRef<T>(value);

    // Only sync when external CONTENT changes (not just ref),
    // and don't stomp on user edits if local already diverged.
    useEffect(() => {
        const externalChanged = !deepEqual(value, lastExternalRef.current);
        const userHasEdits = !deepEqual(local, lastExternalRef.current);
        if (externalChanged && !userHasEdits) {
            lastExternalRef.current = value;
            setLocal(value);
        }
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

    const errors = useMemo(() => validate(local), [local, validate]);
    const valid = errors.length === 0;
    const dirty = !deepEqual(local, lastExternalRef.current);

    const reset = useCallback(() => {
        setLocal(lastExternalRef.current);
    }, []);

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
        // After a successful commit, treat local as the new external baseline
        lastExternalRef.current = local;
    }, [dirty, valid, saving, onCommit, local]);

    return { local, setLocal, errors, valid, dirty, saving, save, reset };
}

export function makeWhatsappMessageUrl(message: string = "") {
    const encoded = encodeURIComponent(message);
    // @ts-ignore
    const phone = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER; // Update this with your business number
    const url = `https://wa.me/${phone}?text=${encoded}`;
    return url;
}

export function sendWhatsappMessage(message: string) {
    window.open(
        makeWhatsappMessageUrl(message),
        "_blank"
    )
}

export function useLocalized(
    translations: { [key: string]: string }
): string {
    const { i18n } = useTranslation();
    return i18n.languages.map(lang => translations[lang]).find(value => value);
}
