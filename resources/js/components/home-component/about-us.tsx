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
import about_us_bg from "/public/img/home_page/about_us_bg.jpg";


export default function AboutUs({ className, super_categories, ...props }) {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={cn("flex", className)}
      {...props}
    >
      <div className="relative basis-1/3 flex">
        <img src={about_us_bg} className={cn(
          "w-full object-cover",
          i18n.dir() === "ltr"
            ? "mask-r-from-50%"
            : "mask-l-from-50%"
        )} />
      </div>
      <div className="flex flex-col gap-6 basis-1/2 py-16 ps-6 text-lg/7">
        <p className="text-muted-foreground">
          About Us
        </p>

        <p className="text-5xl">
          Your Vision. Our Ink.
        </p>

        <p className="text-6xl font-semibold">
          Under Print.
        </p>

        <div>
          <p>
            Under Print is a Laâyoune-based printing studio in Morocco.
          </p>
          <p>
            We exist to help brands look sharp and communicate clearly.
          </p>
          <p>
            From day one, our focus has been uncompromising quality,
            on-time delivery, and bringing our clients' objectives to life with design
            that speaks directly to their audience.
          </p>
        </div>

        <p className="text-2xl font-semibold">
          What sets us apart
        </p>

        <ul className="flex flex-col gap-6">
          <li className="flex items-center gap-6">
            <CornerDownRight color="#FF005E" />
            Quality that shows: Premium stocks, sharp color, and durable finishes—so your brand feels as good as it looks.
          </li>
          <li className="flex items-center gap-6">
            <CornerDownRight color="#FF005E" />
            Delivery you can count on: Reliable turnaround times to keep your campaigns on schedule.
          </li>
          <li className="flex items-center gap-6">
            <CornerDownRight color="#FF005E" />
            Your goals, first: Every project starts with your objectives and ends with measurable impact.
          </li>
          <li className="flex items-center gap-6">
            <CornerDownRight color="#FF005E" />
            Design that connects: Strong, inspiring visuals that target your audience and deliver your message with clarity.
          </li>
        </ul>
      </div>
    </div>
  )
}