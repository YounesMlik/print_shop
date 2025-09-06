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
import custom_request_bg from "/public/img/home_page/custom_request_bg.jpg";
import { Button } from "@/components/ui/button";


export default function CustomRequest({ className, super_categories, ...props }) {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={cn("flex flex-col items-center gap-16 py-30 bg-cover", className)}
      style={{ backgroundImage: `url(${custom_request_bg})` }}
      {...props}
    >
      <div className="flex flex-col items-center gap-10 w-7/10 text-center">
        <div className="flex flex-col items-center gap-6">
          <p className="text-7xl w-4/5 tracking-tighter">
            {t("home.custom_request.headline")}
          </p>
          <p className="text-lg text-stone-300">
            {t("home.custom_request.description")}
          </p>
        </div>
        <Button className="bg-blue-600 py-7 px-10" variant="secondary">
          <Link href={route("custom_order.index")}>
            <span className="text-lg">
              {t("home.custom_request.button")}
            </span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
