import { createBuilder } from "@coltorapps/builder";
import {
    textFieldEntity,
    selectFieldEntity,
    checkboxesFieldEntity,
    radioFieldEntity,
} from "./entities";

export const formBuilder = createBuilder({
    entities: [
        textFieldEntity,
        selectFieldEntity,
        checkboxesFieldEntity,
        radioFieldEntity,
    ],
});