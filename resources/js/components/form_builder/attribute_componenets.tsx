import { createAttributeComponent } from "@coltorapps/builder-react";
import { labelAttribute, optionsAttribute } from "./attributes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { tryCatchZod } from "@/components/helpers";
import { Button } from "@/components/ui/button";

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

export const OptionsAttribute = createAttributeComponent(
  optionsAttribute,
  (props) => {
    const id = `${props.entity.id}-${props.attribute.name}`;
    // Defensive default: always use array
    const value: string[] = Array.isArray(props.attribute.value)
      ? props.attribute.value
      : [""];
    const errors = tryCatchZod(() =>
      optionsAttribute.validate(props.attribute.value, {} as any)
    );
    const isInvalid = errors.length > 0;

    // Handlers for editing array items
    const updateOption = (idx: number, newValue: string) => {
      const newOptions = [...value];
      newOptions[idx] = newValue;
      props.setValue(newOptions);
    };

    const addOption = () => props.setValue([...value, "option"]);
    const removeOption = (idx: number) =>
      props.setValue(value.filter((_, i) => i !== idx));

    return (
      <div className="grid gap-3">
        <Label htmlFor={id} className={isInvalid ? "text-destructive" : ""}>
          Options
        </Label>
        <div className="flex flex-col gap-2">
          {value.map((opt, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <Input
                value={opt}
                aria-invalid={isInvalid}
                onChange={(e) => updateOption(idx, e.target.value)}
                required
                className="flex-1"
                placeholder={`Option ${idx + 1}`}
              />
              <Button
                type="button"
                onClick={() => removeOption(idx)}
                variant="destructive"
                size="icon"
                disabled={value.length <= 1}
                title="Remove"
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addOption}
            variant="outline"
            className="mt-1"
          >
            Add Option
          </Button>
        </div>
        {errors.map((err, key) => (
          <p key={key} className="text-destructive text-sm">
            {err}
          </p>
        ))}
      </div>
    );
  }
);