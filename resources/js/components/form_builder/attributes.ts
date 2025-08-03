import { z } from "zod";
import { createAttribute } from "@coltorapps/builder";

export const labelAttribute = createAttribute({
    name: "label",
    validate(value) {
        return z.string().min(1, "Label is required").parse(value);
    },
});

export const optionsAttribute = createAttribute({
    name: "options",
    validate(value) {
        return z
            .array(
                z.object({
                    label: z.string().min(1, "Label is required"),
                    value: z.string().min(1, "Value is required"),
                })
            )
            .min(1, "At least one option is required")
            .parse(value);
    },
});