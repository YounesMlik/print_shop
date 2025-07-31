import { ZodError } from "zod";
import { createAttributeComponent } from "@coltorapps/builder-react";
import { labelAttribute } from "./attributes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const LabelAttribute = createAttributeComponent(
  labelAttribute,
  (props) => {
    const id = `${props.entity.id}-${props.attribute.name}`;

    return (
      <div>
        <Label htmlFor={id}>Field Label</Label>
        <Input
          id={id}
          name={id}
          value={props.attribute.value ?? ""}
          onChange={(e) => props.setValue(e.target.value)}
          required
        />
        {props.attribute.error instanceof ZodError
          ? props.attribute.error.format()._errors[0]
          : null}
      </div>
    );
  },
);