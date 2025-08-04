import { createAttributeComponent } from "@coltorapps/builder-react";
import { labelAttribute } from "./attributes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { tryCatchZod } from "@/components/helpers";

export const LabelAttribute = createAttributeComponent(
  labelAttribute,
  (props) => {
    const id = `${props.entity.id}-${props.attribute.name}`;
    const errors = tryCatchZod(() => labelAttribute.validate(props.attribute.value, {} as any));
    const isInvalid = errors.length > 0;

    return (
      <div className="grid gap-3">
        <Label htmlFor={id} className={isInvalid ? "text-destructive" : ""}>Field Label</Label>
        <Input
          id={id}
          name={id}
          aria-invalid={isInvalid}
          value={props.attribute.value ?? ""}
          onChange={(e) => props.setValue(e.target.value)}
          required
        />
        {errors.map((err, key) =>
          <p key={key} className="text-destructive text-sm">{err}</p>
        )}
      </div>
    );
  },
);
