import { z } from "zod";
import { createAttribute } from "@coltorapps/builder";

export const labelAttribute = createAttribute({
    name: "label",
    validate(value) {
        return z.string().min(1, "Label is required").parse(value);
    },
});
