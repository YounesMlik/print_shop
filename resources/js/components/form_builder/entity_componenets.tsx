import { z, ZodError } from "zod";
import { createEntityComponent } from "@coltorapps/builder-react";
import { textFieldEntity } from "./entities";

export const TextFieldEntity = createEntityComponent(
  textFieldEntity,
  (props) => {
    return (
      <div>
        <label htmlFor={props.entity.id}>{props.entity.attributes.label}</label>
        <input
          id={props.entity.id}
          name={props.entity.id}
          value={props.entity.value ?? ""}
          onChange={(e) => props.setValue(e.target.value)}
        />
        {props.entity.error instanceof ZodError
          ? z.treeifyError(props.entity.error)[0]
          : null}
      </div>
    );
  },
);