import { useTranslation } from "react-i18next";
import { Head, Link, usePage } from "@inertiajs/react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import hero_bg from "/public/img/home_page/hero_bg.jpg";
import hero_bg_circle from "/public/img/home_page/hero_bg_circle.svg";
import hero_bg_star from "/public/img/home_page/hero_bg_star.svg";


export default function HeroSection({ className, super_categories, ...props }) {
  const { t, i18n } = useTranslation();
  const [hoverSide, setHoverSide] = useState<0 | 1 | null>(null);
  const animationState = hoverSide ?? 0;

  return (
    <div
      className={cn(`relative z-0 flex justify-between px-4 pb-4 text-shadow-lg/10 overflow-clip`, className)}
      style={{ backgroundImage: `url(${hero_bg})` }}
      {...props}
    >
      <div
        className="flex flex-col gap-10 basis-63/128 text-muted-foreground hover:text-foreground transition-all text-start"
        onMouseEnter={() => setHoverSide(0)}
        onMouseLeave={() => setHoverSide(null)}
      >
        <Link href={route("products.index")} className="flex items-center">
          {/* {i18n.dir() === "ltr" ? <ChevronLeft /> : <ChevronRight />} */}
          <p className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl whitespace-pre-line">
            {"Discover \nWhat's \nin \nStore"}
          </p>
        </Link>
        <div className="flex flex-row flex-wrap gap-8">
          {super_categories.map((super_category, i) => (
            <div className="basis-1/1 md:basis-7/16" key={i}>
              <p className="text-lg">
                {super_category.name}
              </p>
              {super_category.categories.map((category, i) => (
                <p className="text-xs" key={i}>
                  {category.name}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center basis-2/128 self-center h-80 sm:h-90 md:h-100 lg:h-120">
        <Separator orientation="vertical" />
      </div>

      <div className="flex flex-col gap-10 items-end basis-63/128 text-muted-foreground hover:text-foreground transition-all text-end"
        onMouseEnter={() => setHoverSide(1)}
        onMouseLeave={() => setHoverSide(null)}
      >
        <Link href={route("custom_order.index")} className="flex items-center gap-2">
          <p className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl whitespace-pre-line">
            {"Start \nYour \nCustom \nOrder"}
          </p>
          {/* {i18n.dir() === "ltr" ? <ChevronRight /> : <ChevronLeft />} */}
        </Link>
      </div>



      <div className={cn(
        "absolute -z-10 -top-100 transition-transformation duration-300 ease-in-out",
        animationState
          ? "left-4/8"
          : "-left-1/8"
      )} >
        <img src={hero_bg_circle} className="w-[45vw] blur-3xl opacity-90" />
      </div>

      <div className={cn(
        "absolute -z-10 -bottom-60 transition-transformation duration-300 delay-50 ease-in-out",
        animationState
          ? "left-4/8"
          : "-left-1/8"
      )}>
        <img src={hero_bg_star} className="w-[35vw] blur-2xl" />
      </div>


      <div className={cn(
        "absolute w-full h-full -z-10 inset-0 bg-linear-to-r from-black/0 to-black/100 transition-opacity",
        animationState
          ? "opacity-0"
          : "opacity-100"
      )} >
      </div>
      <div className={cn(
        "absolute w-full h-full -z-10 inset-0 bg-linear-to-r from-black/100 to-black/0 transition-opacity",
        animationState
          ? "opacity-100"
          : "opacity-0"
      )} >
      </div>
    </div>
  )
}