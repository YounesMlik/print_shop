import { createBuilder } from "@coltorapps/builder";
import { textFieldEntity, selectFieldEntity } from "./entities";

export const formBuilder = createBuilder({
    entities: [textFieldEntity, selectFieldEntity],
});