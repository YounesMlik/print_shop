import { Head, Link } from "@inertiajs/react";
import {
  Button,
} from "@/components/ui/button";
import {
  ArrowRight,
} from "lucide-react";

/**
 * Basic, feature-less main page built for:
 * - Laravel 12 + Inertia 2
 * - React 19
 * - shadcn/ui 2 + Tailwind CSS
 *
 * Drop this file at: resources/js/Pages/HomePage.tsx
 * Route example (web.php): Route::get('/', fn () => Inertia::render('HomePage'));
 */


export default function HomePage() {
  return (
    <>
      <Head title="Welcome" />

      {/* Hero */}
      <section className="relative">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl py-20 text-center md:py-28">

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Printing Shop
            </h1>

            <p className="mt-5 text-lg text-muted-foreground sm:text-xl">
              Buy a product or custom order
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" >
              <Button size="lg" className="h-11 px-6" asChild>
                <Link href={route('products.index')}>
                  Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-6" asChild>
                <Link href={route('custom_order.index')}>
                  Custom Order
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
