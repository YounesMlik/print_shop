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
import WhyUs from "@/components/home-component/why-us";
import CustomRequest from "@/components/home-component/custom-request";

export default function HomePage() {
  const { t } = useTranslation();
  const super_categories = usePage().props.navigation.super_categories.data

  return (
    <>
      <Head title="Under Print" />

      {/* Hero */}
      <section className="relative">
        <HeroSection super_categories={super_categories} />
        <AboutUs id="about_us"/>
        <WhyUs />
        <CustomRequest />

      </section>
    </>
  );
}


export const Layout = BaseLayout;