import { createBuilder } from "@coltorapps/builder";
import { textFieldEntity } from "./entities";

export const formBuilder = createBuilder({
    entities: [textFieldEntity],
});