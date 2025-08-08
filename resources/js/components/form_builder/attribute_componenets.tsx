import { createAttributeComponent } from "@coltorapps/builder-react";
import { labelAttribute, optionsAttribute } from "./attributes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { tryCatchZod, useLocalAttribute } from "@/components/helpers";
import { Button } from "@/components/ui/button";
import * as React from "react";

export const LabelAttribute = createAttributeComponent(
  labelAttribute,
  (props) => {
    const id = `${props.entity.id}-${props.attribute.name}`;

    // adapter to your existing zod-based validator
    const validate = React.useCallback(
      (val: string) => tryCatchZod(() => labelAttribute.validate(val, {} as any)),
      []
    );

    const {
      local,
      setLocal,
      errors,
      valid,
      dirty,
      saving,
      save,
      reset,
    } = useLocalAttribute<string>({
      value: props.attribute.value ?? "",
      validate,
      onCommit: props.setValue,
    });

    const onSubmit = React.useCallback(async (e: React.FormEvent) => {
      e.preventDefault();
      await save();
    }, [save]);

    return (
      <form className="grid gap-3" onSubmit={onSubmit}>
        <Label htmlFor={id} className={!valid ? "text-destructive" : ""}>
          Field Label
        </Label>

        <Input
          id={id}
          name={id}
          aria-invalid={!valid}
          aria-describedby={!valid ? `${id}-errors` : undefined}
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          required
        />

        {!valid && (
          <div id={`${id}-errors`} className="space-y-1">
            {errors.map((err, i) => (
              <p key={i} className="text-destructive text-sm">
                {err}
              </p>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button type="submit" disabled={!valid || !dirty || saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button type="button" variant="outline" onClick={reset} disabled={!dirty || saving}>
            Reset
          </Button>
        </div>
      </form>
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