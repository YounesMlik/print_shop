import z, { boolean } from "zod";

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