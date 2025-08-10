import { z } from "zod";
import { createEntity } from "@coltorapps/builder";
import { labelAttribute, optionsAttribute } from "./attributes";

export const textFieldEntity = createEntity({
    name: "textField",
    attributes: [labelAttribute],
    validate(value) {
        return z.string().optional().parse(value);
    },
});

export const textAreaFieldEntity = createEntity({
    name: "textAreaField",
    attributes: [labelAttribute],
    validate(value) {
        return z.string().optional().parse(value);
    },
});

export const selectFieldEntity = createEntity({
    name: "selectField",
    attributes: [labelAttribute, optionsAttribute],
    validate(value) {
        // Value should be one of the option values or empty (if not required)
        return z.string().optional().parse(value);
    },
});

export const checkboxesFieldEntity = createEntity({
    name: "checkboxesField",
    attributes: [labelAttribute, optionsAttribute],
    validate(value) {
        // Value should be an array of selected option values (or empty)
        return z.array(z.string()).optional().parse(value);
    },
});

export const radioFieldEntity = createEntity({
    name: "radioField",
    attributes: [labelAttribute, optionsAttribute],
    validate(value) {
        // Value should be one of the option values or empty
        return z.string().optional().parse(value);
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