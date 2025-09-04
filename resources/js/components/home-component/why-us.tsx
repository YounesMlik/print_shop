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


export default function WhyUs({ className, super_categories, ...props }) {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={cn("flex flex-col items-center gap-16 py-20", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-6 w-3/5 text-center">
        <p className="text-lg text-muted-foreground">
          Why Under Print
        </p>
        <p className="text-5xl">
          We help your brand look sharp, move fast, and speak clearly
        </p>
        <p className="text-lg text-muted-foreground">
          Unlock your business's potential with standout design, flawless print, and the workplace essentials to keep your team producing at its best.
        </p>
      </div>

      <ul className="grid grid-cols-3 grid-rows-2 gap-6 px-30">
        {[
          {
            img: img_1,
            title: "Quality you can see :",
            desc: "Calibrated color, premium materials, and rigorous checks on every job.",
          },
          {
            img: img_2,
            title: "Speed without shortcuts :",
            desc: "Reliable turnarounds and on-time delivery you can plan around.",
          },
          {
            img: img_3,
            title: "Results-first mindset :",
            desc: "We start with your objectives, target your audience, and design to convert.",
          },
          {
            img: img_4,
            title: "All-in-one partner :",
            desc: "Print solutions plus printing supplies, Office Furniture & Accessories, and Tech & Accessories—one trusted partner.",
          },
          {
            img: img_5,
            title: "Design that connects :",
            desc: "Strong, inspiring visuals that deliver your message clearly.",
          },
          {
            img: img_6,
            title: "Transparent pricing & proofs :",
            desc: "No surprises—clear quotes, pre-print proofs, and proactive updates.",
          }
        ].map(({ img, title, desc }) => (
          <li className="flex flex-col gap-6 px-4 pt-4 pb-16 bg-card rounded-2xl">
            <img src={img} className="rounded-2xl" />
            <div className="flex flex-col gap-2 px-2">
              <p className="text-xl text-card-foreground">
                {title}
              </p>
              <p className="text-sm text-card-foreground">
                {desc}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
