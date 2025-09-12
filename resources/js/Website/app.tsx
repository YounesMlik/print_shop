import { StrictMode, Suspense, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { ThemeProvider } from "@/components/theme-provider";
import Layout from '@/Layouts/Layout';
import { setupI18n } from '@/components/i18n';

createInertiaApp({
  resolve: name => {
    // @ts-ignore
    const pages = import.meta.glob('./Pages/*/*.jsx', { eager: true });
    const page = pages[`./Pages/${name}.jsx`];

    const PageComponent = page.default;
    const PageLayout = page.Layout ?? Layout;

    PageComponent.layout = (page) => <PageLayout>{page}</PageLayout>;

    return PageComponent;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<Root App={App} props={props} />);
  },
  progress: {
    color: "#14fd0b"
  }
});


function Root({ App, props }: any) {
  const { i18n } = props.initialPage.props;
  setupI18n(i18n);

  document.documentElement.lang = i18n.locale;
  document.documentElement.dir = i18n.isRtl ? "rtl" : "ltr";

  return (
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Suspense fallback={<div className="p-4 text-sm opacity-60">Loading…</div>}>
          <App {...props} />
        </Suspense>
      </ThemeProvider>
    </StrictMode>
  );
}


declare global {
  // @ts-ignore
  module "*.png";
  // @ts-ignore
  module "*.svg";
  // @ts-ignore
  module "*.jpeg";
  // @ts-ignore
  module "*.jpg";
};