import { useTranslation } from "react-i18next";
import { Head, Link, usePage } from "@inertiajs/react";
import {
  Button,
} from "@/components/ui/button";
import {
  ArrowRight,
} from "lucide-react";
import BaseLayout from "@/Layouts/BaseLayout";
import HeroSection from "@/components/home-component/hero-section";
import AboutUs from "@/components/home-component/about-us";

export default function HomePage() {
  const { t } = useTranslation();
  const super_categories = usePage().props.navigation.super_categories.data

  return (
    <>
      <Head title="Under Print" />

      {/* Hero */}
      <section className="relative">
        <HeroSection super_categories={super_categories} />
        <AboutUs />

        <div className="container mx-auto px-4">


          <div className="mx-auto max-w-4xl py-20 text-center md:py-28">


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


export const Layout = BaseLayout;