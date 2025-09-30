import { z } from "zod/mini";
import { createEntity } from "@coltorapps/builder";
import { labelAttribute, requiredAttribute, optionsAttribute } from "./attributes";

export const textFieldEntity = createEntity({
    name: "textField",
    attributes: [labelAttribute, requiredAttribute],
    validate(value) {
        return z.optional(z.string()).parse(value);
    },
});

export const textAreaFieldEntity = createEntity({
    name: "textAreaField",
    attributes: [labelAttribute, requiredAttribute],
    validate(value) {
        return z.optional(z.string()).parse(value);
    },
});

export const selectFieldEntity = createEntity({
    name: "selectField",
    attributes: [labelAttribute, requiredAttribute, optionsAttribute],
    validate(value) {
        // Value should be one of the option values or empty (if not required)
        return z.optional(z.string()).parse(value);
    },
});

export const checkboxesFieldEntity = createEntity({
    name: "checkboxesField",
    attributes: [labelAttribute, requiredAttribute, optionsAttribute],
    validate(value) {
        // Value should be an array of selected option values (or empty)
        return z.optional(z.array(z.string())).parse(value);
    },
});

export const radioFieldEntity = createEntity({
    name: "radioField",
    attributes: [labelAttribute, requiredAttribute, optionsAttribute],
    validate(value) {
        // Value should be one of the option values or empty
        return z.optional(z.string()).parse(value);
    },
});



const entities = [
    textFieldEntity,
    textAreaFieldEntity,
    selectFieldEntity,
    checkboxesFieldEntity,
    radioFieldEntity,
];
export default entities;