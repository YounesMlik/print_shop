import { useTranslation } from "react-i18next";
import { Head, Link, usePage } from "@inertiajs/react";
import {
  Button,
} from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { t } = useTranslation();
  const super_categories = usePage().props.navigation.super_categories.data

  return (
    <>
      <Head title="Under Print" />

      {/* Hero */}
      <section className="relative">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl py-20 text-center md:py-28">

            <HeroSection super_categories={super_categories} />

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Under Print
            </h1>

            <p className="mt-5 text-lg text-muted-foreground sm:text-xl">
              {t("hero.headline")}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" >
              <Button size="lg" className="h-11 px-6" asChild>
                <Link href={route('products.index')}>
                  {t("products")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-6" asChild>
                <Link href={route('custom_order.index')}>
                  {t("custom_order")}
                </Link>
              </Button>
            </div>

            {/* Decorative mockup */}
            <div className="mt-14 rounded-2xl border bg-card p-2 shadow-sm">
              <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-br from-muted to-muted-foreground/10" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroSection({ className, super_categories, ...props }) {
  const { t, i18n } = useTranslation();

  return (
    <div className={cn("flex justify-between", className)} {...props}>
      <div className="text-muted-foreground hover:text-foreground transition-all text-start">
        <Link href={route("products.index")} className="flex items-center">
          {/* {i18n.dir() === "ltr" ? <ChevronLeft /> : <ChevronRight />} */}
          <p className="text-4xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl whitespace-pre-line">
            {"Discover \nWhat's \nin \nStore"}
          </p>
        </Link>
        <div className="flex">
          {super_categories.map((super_category) => (
            <div>
              <p className="text-lg">
                {super_category.name}
              </p>
              {super_category.categories.map((category) => (
                <p className="text-sm">
                  {category.name}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="self-center h-30 sm:h-40 md:h-50 lg:h-60">
        <Separator orientation="vertical" />
      </div>
      <div className="text-muted-foreground hover:text-foreground transition-all text-end">
        <Link href={route("custom_order.index")} className="flex items-center gap-2">
          <p className="text-4xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl whitespace-pre-line">
            {"Start \nYour \nCustom \nOrder"}
          </p>
          {/* {i18n.dir() === "ltr" ? <ChevronRight /> : <ChevronLeft />} */}
        </Link>
      </div>
    </div>
  )
}