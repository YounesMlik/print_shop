// QuantitySelector.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  label?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 1e12,
  step = 1,
  className,
  label = "Quantity",
}: QuantitySelectorProps) {
  const clamp = (n: number) => Math.max(min, Math.min(max, n));
  const set = (n: number) => onChange(clamp(n));

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => set(value - step)}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <Input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => set(Number(e.target.value) || min)}
        className="w-16 text-center"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        role="spinbutton"
      />

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => set(value + step)}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
