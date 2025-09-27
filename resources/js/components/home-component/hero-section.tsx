import { useTranslation } from "react-i18next";
import { Head, Link, usePage } from "@inertiajs/react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsDown,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ComponentProps, useState } from "react";
import hero_bg from "/public/img/home_page/hero_bg.jpg";
import hero_bg_circle from "/public/img/home_page/hero_bg_circle.svg";
import hero_bg_star from "/public/img/home_page/hero_bg_star.svg";
import { take } from "lodash-es";
import { SetRequired } from "type-fest";

type HeroSectionProps = ComponentProps<"div"> & { super_categories: SetRequired<SuperCategory, "categories">[] }
export default function HeroSection({ className, super_categories, ...props }: HeroSectionProps) {
  const { t, i18n } = useTranslation();
  const [hoverSide, setHoverSide] = useState<0 | 1 | null>(null);
  const animationState = hoverSide ?? 0;
  const isWidthMd = window.innerWidth >= 1024

  return (
    <div
      className={cn(`relative z-0 bg-cover bg-center flex justify-between px-24 py-12 text-shadow-lg/10 overflow-clip flex-col lg:flex-row`, className)}
      style={{ backgroundImage: `url(${hero_bg})` }}
      {...props}
    >
      <div
        className={cn(
          "flex flex-col gap-10 basis-63/128 transition-all text-start",
          animationState
            ? "text-muted-foreground opacity-80"
            : "text-foreground opacity-100"
        )}
        onMouseEnter={() => setHoverSide(0)}
        onMouseLeave={() => setHoverSide(null)}
      >
        <Link href={route("products.index")} className="flex items-center">
          {/* {i18n.dir() === "ltr" ? <ChevronLeft /> : <ChevronRight />} */}
          <p className="font-semibold tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl whitespace-pre-line">
            {t("home.hero_section.discover_whats_in_store")}
          </p>
        </Link>
        <ul className={cn(
          "flex flex-row flex-wrap gap-8 transition-transform",
          animationState
            ? i18n.dir() === "ltr"
              ? "-translate-x-2/1"
              : "translate-x-2/1"
            : "translate-x-0"
        )}>
          {take(super_categories, 4).map((super_category, i) => (
            <li className="basis-1/1 md:basis-7/16" key={i}>
              <Link
                href={route("super-categories.show", {
                  super_category: super_category.id,
                })}
              >
                <p className="text-lg">
                  {super_category.name}
                </p>
              </Link>
              <ul>
                {take(super_category.categories, 4).map((category, i) => (
                  <li key={i}>
                    <Link
                      href={route("categories.show", {
                        category: category.id,
                      })}
                    >
                      <p className="text-xs">
                        {category.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center basis-2/128 self-center w-full">
        {isWidthMd
          ? <>
            <div className="h-80 sm:h-90 md:h-100 lg:h-120">
              <Separator orientation="vertical" />
            </div>
            <a className="flex flex-col items-center opacity-30" href="#about_us">
              <p className="text-nowrap font-semibold text-4xl">
                {t("home.hero_section.scroll_down")}
              </p>
              <p className="text-nowrap text-sm">
                {t("home.hero_section.to_know_more_about_us")}
              </p>
              <ChevronsDown size={30} />
            </a>
          </>

          : <div className="py-10 w-full">
            <Separator orientation="horizontal" />
          </div>
        }
      </div>

      <div
        className={cn(
          "flex flex-col gap-10 items-end basis-63/128 transition-all text-end",
          animationState
            ? "text-foreground opacity-100"
            : "text-muted-foreground opacity-80"
        )}
        onMouseEnter={() => setHoverSide(1)}
        onMouseLeave={() => setHoverSide(null)}
      >
        <Link href={route("custom_order.index")} className="flex items-center gap-2">
          <p className="font-semibold tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl whitespace-pre-line">
            {t("home.hero_section.start_your_custom_order")}
          </p>
          {/* {i18n.dir() === "ltr" ? <ChevronRight /> : <ChevronLeft />} */}
        </Link>
      </div>



      <div className={cn(
        "absolute -z-10 -top-100 -start-1/8 transition-transformation duration-300 ease-in-out",
        animationState
          ? i18n.dir() === "ltr"
            ? "translate-x-2/1"
            : "-translate-x-2/1"
          : "translate-x-0"
      )} >
        <img src={hero_bg_circle} className="w-[45vw] blur-3xl opacity-90" />
      </div>

      <div className={cn(
        "absolute -z-10 -bottom-60 -start-1/8 transition-transformation duration-300 delay-50 ease-in-out",
        animationState
          ? i18n.dir() === "ltr"
            ? "translate-x-5/2"
            : "-translate-x-5/2"
          : "translate-x-0"
      )}>
        <img src={hero_bg_star} className="w-[35vw] blur-2xl" />
      </div>


      <div className={cn(
        "absolute w-full h-full -z-10 inset-0 from-black/0 to-black/100 transition-opacity",
        animationState
          ? "opacity-0"
          : "opacity-90",
        i18n.dir() === "ltr"
          ? "bg-linear-to-r"
          : "bg-linear-to-l",
      )} >
      </div>
      <div className={cn(
        "absolute w-full h-full -z-10 inset-0 from-black/0 to-black/100 transition-opacity",
        animationState
          ? "opacity-90"
          : "opacity-0",
        i18n.dir() === "ltr"
          ? "bg-linear-to-l"
          : "bg-linear-to-r",
      )} >
      </div>
    </div>
  )
}