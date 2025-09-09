import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useMemo } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export type Direction = "ltr" | "rtl";

type UseDirectionResult = Readonly<{
  dir: Direction;
  isRTL: boolean;
  isLTR: boolean;
}>;

export function useDirection(localDir?: string): UseDirectionResult;
export function useDirection(localDir: "rtl"): { dir: "rtl"; isRTL: true; isLTR: false };
export function useDirection(localDir: "ltr"): { dir: "ltr"; isRTL: false; isLTR: true };
export function useDirection(localDir?: string) {
  const dir = useMemo<Direction>(() => {
    const raw =
      (localDir ??
        (typeof document !== "undefined" ? document.documentElement.dir : "ltr") ??
        "ltr").toLowerCase();

    // Normalize: anything not strictly "rtl" becomes "ltr"
    return raw === "rtl" ? "rtl" : "ltr";
  }, [localDir]);

  const isRTL = dir === "rtl";
  return { dir, isRTL, isLTR: !isRTL };
}
