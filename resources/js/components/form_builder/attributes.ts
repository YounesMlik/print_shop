import { z } from "zod";
import { createAttribute } from "@coltorapps/builder";
import i18next from "i18next";

export const labelAttribute = createAttribute({
    name: "label",
    validate(value) {
        return z
            .record(z.string().min(2), z.string().min(1, "Label is required"))
            .parse(value);
    },
});

export const requiredAttribute = createAttribute({
    name: "required",
    validate(value) {
        return z
            .boolean()
            .parse(value);
    },
});

export const optionsAttribute = createAttribute({
    name: "options",
    validate(value) {
        return z
            .array(
                z.string().min(1, "Value is required"),
            )
            .min(1, "At least one option is required")
            .refine((value) => value.length === new Set(value).size, "Options must be unique")
            .parse(value);
    },
});