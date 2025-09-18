// VariantPicker.tsx
import * as React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { VariantPickerProps } from "@/types/global";
import { QuantitySelector } from "@/components/quantity-selector";
import { cn } from "@/lib/utils";

export default function VariantPicker({
  options,
  selectedOption,
  quantity,
  onOptionChange,
  onQuantityChange,
  currency = "MAD",
  className,
  label = "Choose an option",
  no_options_available_label = "No options available",
}: VariantPickerProps) {

  const asCurrency = (p: Option["price"]) => {
    if (p === null || p === undefined) return "";
    const num = typeof p === "string" ? parseFloat(p) : Number(p);
    if (Number.isNaN(num)) return "";
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
      }).format(num);
    } catch {
      // fallback if currency code is invalid
      return `${num.toFixed(2)} ${currency}`;
    }
  };

  const displayName = (o: Option): string => {
    const name = o.name?.trim();
    if (name) {
      return name;
    } else if (o.option_attributes?.length) {
      return o.option_attributes.map(a => a.name).join(" / ");
    } else {
      return `Option #${o.id}`;
    }
  };

  const handleChange = (idStr: string) => {
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
                      <div>
                        <div className="font-medium">{displayName(o)}</div>

                        {o.option_attributes?.length ? (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {o.option_attributes.map((a) => (
                              <Badge variant="secondary" key={a.id}>
                                <span className="text-muted-foreground">{a.name}:</span>
                                {a.value}
                              </Badge>
                            ))}
                          </div>
                        ) : null}
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
  const [selected, setSelected] = React.useState<any | null>(null);
  const [quantity, setQuantity] = React.useState<number>(1);

  return (
    <div className="space-y-4">
      <VariantPicker
        options={options}
        selectedOption={selected?.id ?? null}
        onOptionChange={setSelected}
        quantity={quantity}
        onQuantityChange={setQuantity}
        currency="MAD"
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
