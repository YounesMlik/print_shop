import { z, ZodError } from "zod";
import { createEntityComponent } from "@coltorapps/builder-react";
import { textFieldEntity } from "./entities";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const TextFieldEntity = createEntityComponent(
  textFieldEntity,
  (props) => {
    return (
      <div>
        <Label htmlFor={props.entity.id}>{props.entity.attributes.label}</Label>
        <Input
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