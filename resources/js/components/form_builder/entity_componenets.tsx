import { z, ZodError } from "zod";
import { createEntityComponent } from "@coltorapps/builder-react";
import { textFieldEntity } from "./entities";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { tryCatchZod } from "@/components/helpers";

export const TextFieldEntity = createEntityComponent(
  textFieldEntity,
  (props) => {
    const errors = tryCatchZod(() => textFieldEntity.validate(props.entity.value, {} as any));
    const isInvalid = errors.length > 0;
    return (
      <div>
        <Label htmlFor={props.entity.id}>{props.entity.attributes.label}</Label>
        <Input
          id={props.entity.id}
          name={props.entity.id}
          aria-invalid={isInvalid}
          value={props.entity.value ?? ""}
          onChange={(e) => props.setValue(e.target.value)}
        />
        {errors.map((err, key) =>
          <p key={key} className="text-destructive text-sm">{err}</p>
        )}
        {/* {props.entity.error instanceof ZodError
          ? z.treeifyError(props.entity.error)[0]
          : null} */}
      </div>
    );
  },
);

const entity_components = { textField: TextFieldEntity };
export default entity_components;