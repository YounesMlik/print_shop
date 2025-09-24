import { useTranslation } from "react-i18next";
import { Head, Link, usePage } from "@inertiajs/react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsDown,
  CornerDownLeft,
  CornerDownRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import about_us_bg from "/public/img/home_page/about_us_bg.jpg";


export default function AboutUs({ className, super_categories, ...props }) {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={cn("flex", className)}
      {...props}
    >
      <div className="relative basis-0 md:basis-1/3 flex">
        <img src={about_us_bg} className={cn(
          "w-full object-cover",
          i18n.dir() === "ltr"
            ? "mask-r-from-50%"
            : "mask-l-from-50%"
        )} />
      </div>
      <div className="flex flex-col gap-6 basis-1/1 sm:basis-3/4 md:basis-1/2 py-16 ps-6 text-lg/7">
        <p className="text-muted-foreground">
          {t("home.about_us.about_us")}
        </p>

        <p className="text-5xl">
          {t("home.about_us.tagline_1")}
        </p>

        <p className="text-6xl font-semibold">
          {t("home.about_us.tagline_2")}
        </p>

        <div>
          {(t("home.about_us.description", { returnObjects: true }) as unknown as string[]).map((desc, i) =>
            <p key={i}>
              {desc}
            </p>
          )}
        </div>

        <p className="text-2xl font-semibold">
          {t("home.about_us.section_title")}
        </p>

        <ul className="flex flex-col gap-6">
          {(t("home.about_us.highlights", { returnObjects: true }) as unknown as string[]).map((highlight, i) =>
            <li className="flex items-center gap-6" key={i}>
              {i18n.dir() === "ltr"
                ? <CornerDownRight color="#FF005E" />
                : <CornerDownLeft color="#FF005E" />
              }
              {highlight}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}