import { useTranslation } from "react-i18next";
import { Head, Link, usePage } from "@inertiajs/react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsDown,
  CornerDownRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import img_1 from "/public/img/home_page/why_us/1.jpg";
import img_2 from "/public/img/home_page/why_us/2.jpg";
import img_3 from "/public/img/home_page/why_us/3.jpg";
import img_4 from "/public/img/home_page/why_us/4.jpg";
import img_5 from "/public/img/home_page/why_us/5.jpg";
import img_6 from "/public/img/home_page/why_us/6.jpg";
const images = [
  img_1,
  img_2,
  img_3,
  img_4,
  img_5,
  img_6,
]

export default function WhyUs({ className, super_categories, ...props }) {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={cn("flex flex-col items-center gap-16 py-20", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-6 w-3/5 text-center">
        <p className="text-lg text-muted-foreground">
          {t("home.why_us.why_us")}
        </p>
        <p className="text-5xl">
          {t("home.why_us.headline")}
        </p>
        <p className="text-lg text-muted-foreground">
          {t("home.why_us.subheadline")}
        </p>
      </div>

      <ul className="grid grid-cols-3 grid-rows-2 gap-6 px-30">
        {(t("home.why_us.features") as unknown as [{ title: string, description: string }])
          .map(({ title, description }, i) => (
            <li className="flex flex-col gap-6 px-4 pt-4 pb-16 bg-card rounded-2xl" key={i}>
              <img src={images[i]} className="rounded-2xl" />
              <div className="flex flex-col gap-2 px-2">
                <p className="text-xl text-card-foreground">
                  {title}
                </p>
                <p className="text-sm text-card-foreground">
                  {description}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
