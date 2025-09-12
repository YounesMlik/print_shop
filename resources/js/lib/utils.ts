import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useMemo } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export type Direction = "ltr" | "rtl";

type UseDirectionResult = Readonly<{
  direction: Direction;
  isRTL: boolean;
  isLTR: boolean;
}>;

export function useDirection(localDir?: string): UseDirectionResult;
export function useDirection(localDir: "rtl"): { direction: "rtl"; isRTL: true; isLTR: false };
export function useDirection(localDir: "ltr"): { direction: "ltr"; isRTL: false; isLTR: true };
export function useDirection(localDir?: string) {
  const direction = useMemo<Direction>(() => {
    const raw =
      (localDir ??
        (typeof document !== "undefined" ? document.documentElement.dir : "ltr") ??
        "ltr").toLowerCase();

    // Normalize: anything not strictly "rtl" becomes "ltr"
    return raw === "rtl" ? "rtl" : "ltr";
  }, [localDir]);

  const isRTL = direction === "rtl";
  return { direction, isRTL, isLTR: !isRTL };
}
