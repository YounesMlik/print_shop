import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { QuantitySelector } from "@/components/quantity-selector";
import { cn } from "@/lib/utils";
import { SetRequired } from "type-fest";
import { useState } from "react";
import { asCurrency } from "@/components/helpers";


type VariantPickerProps = {
  /** Your options array, as provided */
  options: OptionWithAttr[],
  /** Controlled selected option */
  selectedOption: OptionWithAttr | null,
  /** Controlled quantity */
  quantity: number,
  /** Called with the full selected option object (or null) */
  onOptionChange: (selected: OptionWithAttr | null) => void,
  /** Called with the quantity */
  onQuantityChange: (quantity: number) => void,
  /** Extra className for the outer Card */
  className?: string | undefined,
  /** Optional label above the list */
  label?: string,
  /** Optional label when no options are available */
  no_options_available_label?: string,
}

export default function VariantPicker({
  options,
  selectedOption,
  quantity,
  onOptionChange,
  onQuantityChange,
  className,
  label = "Choose an option",
  no_options_available_label = "No options available",
}: VariantPickerProps) {

  function handleChange(idStr: string) {
    const id = Number(idStr);
    onOptionChange(options.find((o) => o.id === id) ?? null);
  };

  return (
    <Card className={cn("p-3", className)}>
      {options.length === 0 ?
        <p className="text-sm text-muted-foreground">{no_options_available_label}</p>
        :
        <>

          <CardHeader className="p-0 pb-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{label}</p>
            <QuantitySelector value={quantity} onChange={onQuantityChange} />
          </CardHeader>

          <CardContent className="p-0">
            <RadioGroup
              value={selectedOption?.id?.toString() ?? ""}
              onValueChange={handleChange}
              className="grid gap-2"
            >
              {options.map((o) => {
                const selected = o.id === selectedOption?.id;
                return (
                  <label
                    key={o.id}
                    htmlFor={`opt-${o.id}`}
                    className={[
                      "flex items-center justify-between rounded-2xl border p-3 cursor-pointer transition",
                      selected
                        ? "border-primary ring-2 ring-primary/20"
                        : "hover:bg-muted/40",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem id={`opt-${o.id}`} value={o.id.toString()} />
                      <div className="flex flex-col gap-1">
                        <div className="font-medium">{o.name}</div>
                        <div className="flex flex-wrap gap-1">
                          {o.option_attributes.map((a) => (
                            <Badge variant="secondary" key={a.id}>
                              <span className="text-muted-foreground">{a.name}:</span>
                              {a.value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {o.price != null
                      // && String(o.price) !== "0.00"
                      ? (
                        <div className="text-sm">{asCurrency(o.price)}</div>
                      ) : null}
                  </label>
                );
              })}
            </RadioGroup>
          </CardContent>
        </>
      }
    </Card>
  );
}



export function ProductBuyBox({ options }: { options: any[] }) {
  const [selected, setSelected] = useState<any | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="space-y-4">
      <VariantPicker
        options={options}
        selectedOption={selected?.id ?? null}
        onOptionChange={setSelected}
        quantity={quantity}
        onQuantityChange={setQuantity}
      />

      <button
        className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium"
        disabled={!selected}
        onClick={() => console.log("Add to cart option:", selected)}
      >
        Add to cart
      </button>
    </div>
  );
}

type OptionWithAttr = SetRequired<Option, "option_attributes">