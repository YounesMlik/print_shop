import { createAttributeComponent } from "@coltorapps/builder-react";
import { labelAttribute, optionsAttribute } from "./attributes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { tryCatchZod, useLocalAttribute } from "@/components/helpers";
import { Button } from "@/components/ui/button";
import * as React from "react";
import i18next from "i18next";

export const LabelAttribute = createAttributeComponent(
  labelAttribute,
  (props) => {
    const baseId = `${props.entity.id}-${props.attribute.name}`;
    
    // Support legacy string by wrapping into { [activeLocale]: value }
    const toRecord = (v: unknown): Record<string, string> => {
      if (typeof v === "string") return { [i18next.language || "en"]: v };
      return (v as Record<string, string>) ?? {};
    };

    const initialRecord = React.useMemo(
      () => toRecord(props.attribute.value),
      [props.attribute.value]
    );

    // Locales = union(i18next.languages, existing keys)
    const locales = React.useMemo(() => {
      const fromI18n = Array.isArray(i18next.languages) ? i18next.languages : [];
      const fromValue = Object.keys(initialRecord);
      const uniq = Array.from(new Set([...fromI18n, ...fromValue])).filter(Boolean);
      return uniq.length ? uniq : ["en"];
    }, [initialRecord]);

    const validate = React.useCallback(
      (val: Record<string, string>) =>
        tryCatchZod(() => labelAttribute.validate(val as any, {} as any)),
      []
    );

    const { local, setLocal, errors, valid, dirty, saving, save, reset } =
      useLocalAttribute<Record<string, string>>({
        value: locales.reduce<Record<string, string>>((acc, l) => {
          acc[l] = initialRecord[l] ?? "";
          return acc;
        }, {}),
        validate,
        onCommit: props.setValue,
      });

    const onSubmit = React.useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        await save();
      },
      [save]
    );

    return (
      <form className="grid gap-3" onSubmit={onSubmit}>
        <Label className={!valid ? "text-destructive" : ""}>Field Label</Label>

        <div className="grid gap-2">
          {locales.map((lng) => {
            const inputId = `${baseId}-${lng}`;
            return (
              <div key={lng} className="grid gap-1">
                <Label htmlFor={inputId} className="text-xs font-medium opacity-80">
                  {lng.toUpperCase()}
                </Label>
                <Input
                  id={inputId}
                  name={inputId}
                  value={local[lng] ?? ""}
                  aria-invalid={!valid}
                  onChange={(e) =>
                    setLocal((prev) => ({ ...prev, [lng]: e.target.value }))
                  }
                />
              </div>
            );
          })}
        </div>

        {!valid && (
          <div className="space-y-1">
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
  }
);


export const OptionsAttribute = createAttributeComponent(
  optionsAttribute,
  (props) => {
    const id = `${props.entity.id}-${props.attribute.name}`;

    const coerce = (val: unknown): string[] =>
      Array.isArray(val) ? val.map(v => String(v ?? "")) : [""];

    const validate = React.useCallback(
      (val: string[]) => tryCatchZod(() => optionsAttribute.validate(val, {} as any)),
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
    } = useLocalAttribute<string[]>({
      value: coerce(props.attribute.value),
      validate,
      onCommit: props.setValue, // supports async
    });

    // local-only editors
    const updateOption = (idx: number, newValue: string) => {
      setLocal(prev => {
        const next = [...prev];
        next[idx] = newValue;
        return next;
      });
    };

    const addOption = () => setLocal(prev => [...prev, ""]);
    const removeOption = (idx: number) =>
      setLocal(prev => {
        const next = prev.filter((_, i) => i !== idx);
        return next.length ? next : [""]; // keep at least one row
      });

    const moveOption = (from: number, to: number) =>
      setLocal(prev => {
        const next = [...prev];
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item);
        return next;
      });

    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await save();
    };

    return (
      <form className="grid gap-3" onSubmit={onSubmit} aria-labelledby={`${id}-label`}>
        <Label id={`${id}-label`} className={!valid ? "text-destructive" : ""}>
          Options
        </Label>

        <div className="flex flex-col gap-2">
          {local.map((opt, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <Input
                value={opt}
                aria-invalid={!valid}
                aria-describedby={!valid ? `${id}-errors` : undefined}
                onChange={(e) => updateOption(idx, e.target.value)}
                required
                className="flex-1"
                placeholder={`Option ${idx + 1}`}
              />
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => moveOption(idx, Math.max(0, idx - 1))}
                  disabled={idx === 0 || saving}
                  title="Move up"
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => moveOption(idx, Math.min(local.length - 1, idx + 1))}
                  disabled={idx === local.length - 1 || saving}
                  title="Move down"
                >
                  ↓
                </Button>
                <Button
                  type="button"
                  onClick={() => removeOption(idx)}
                  variant="destructive"
                  size="icon"
                  disabled={local.length <= 1 || saving}
                  title="Remove"
                >
                  ×
                </Button>
              </div>
            </div>
          ))}

          <Button type="button" onClick={addOption} variant="outline" className="mt-1" disabled={saving}>
            Add Option
          </Button>
        </div>

        {!valid && (
          <div id={`${id}-errors`} className="space-y-1">
            {errors.map((err, key) => (
              <p key={key} className="text-destructive text-sm">{err}</p>
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
  }
);