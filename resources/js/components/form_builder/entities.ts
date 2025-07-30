import { z } from "zod";
import { createEntity } from "@coltorapps/builder";
import { labelAttribute } from "./attributes";

export const textFieldEntity = createEntity({
    name: "textField",
    attributes: [labelAttribute],
    validate(value) {
        return z.string().optional().parse(value);
    },
});