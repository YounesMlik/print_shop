import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { ThemeProvider } from "@/components/theme-provider";
import Layout from '@/Layouts/Layout';

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

    root.render(
      <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App {...props} />
        </ThemeProvider>
      </React.StrictMode>
    );
  },
});
