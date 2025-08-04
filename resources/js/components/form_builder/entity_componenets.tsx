import { createEntityComponent } from "@coltorapps/builder-react";
import { textFieldEntity, selectFieldEntity, checkboxesFieldEntity, radioFieldEntity } from "./entities";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { tryCatchZod } from "@/components/helpers";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const TextFieldEntity = createEntityComponent(
  textFieldEntity,
  (props) => {
    const errors = tryCatchZod(() => textFieldEntity.validate(props.entity.value, {} as any));
    const isInvalid = errors.length > 0;
    return (
      <div className="grid gap-2">
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
      </div>
    );
  },
);

export const SelectFieldEntity = createEntityComponent(
  selectFieldEntity,
  (props) => {
    const errors = tryCatchZod(() => selectFieldEntity.validate(props.entity.value, {} as any));
    const isInvalid = errors.length > 0;
    const options = props.entity.attributes.options ?? [];

    return (
      <div className="grid gap-2">
        <Label htmlFor={props.entity.id}>{props.entity.attributes.label}</Label>
        <Select
          value={props.entity.value ?? ""}
          onValueChange={props.setValue}
        >
          <SelectTrigger
            id={props.entity.id}
            aria-invalid={isInvalid}
          >
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, idx) => (
              <SelectItem key={idx} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.map((err, key) =>
          <p key={key} className="text-destructive text-sm">{err}</p>
        )}
      </div>
    );
  },
);

export const CheckboxesFieldEntity = createEntityComponent(
  checkboxesFieldEntity,
  (props) => {
    const errors = tryCatchZod(() => checkboxesFieldEntity.validate(props.entity.value, {} as any));
    const isInvalid = errors.length > 0;
    const options = props.entity.attributes.options ?? [];
    const value = props.entity.value ?? [];

    function onToggle(val) {
      if (value.includes(val)) {
        props.setValue(value.filter((v) => v !== val));
      } else {
        props.setValue([...value, val]);
      }
    }

    return (
      <div className="grid gap-2">
        <Label>{props.entity.attributes.label}</Label>
        <div className="flex flex-col gap-1">
          {options.map((option, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={value.includes(option)}
                onCheckedChange={() => onToggle(option)}
                aria-invalid={isInvalid}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.map((err, key) =>
          <p key={key} className="text-destructive text-sm">{err}</p>
        )}
      </div>
    );
  }
);

export const RadioFieldEntity = createEntityComponent(
  radioFieldEntity,
  (props) => {
    const errors = tryCatchZod(() => radioFieldEntity.validate(props.entity.value, {} as any));
    const isInvalid = errors.length > 0;
    const options = props.entity.attributes.options ?? [];

    return (
      <div className="grid gap-2">
        <Label>{props.entity.attributes.label}</Label>
        <RadioGroup
          value={props.entity.value ?? ""}
          onValueChange={props.setValue}
        >
          {options.map((option, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option}
                id={`${props.entity.id}-radio-${idx}`}
                aria-invalid={isInvalid}
              />
              <Label htmlFor={`${props.entity.id}-radio-${idx}`}>
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.map((err, key) =>
          <p key={key} className="text-destructive text-sm">{err}</p>
        )}
      </div>
    );
  }
);

const entity_components = {
  textField: TextFieldEntity,
  selectField: SelectFieldEntity,
  checkboxesField: CheckboxesFieldEntity,
  radioField: RadioFieldEntity,
};
export default entity_components;