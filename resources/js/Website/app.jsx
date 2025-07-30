import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { ThemeProvider } from "@/components/theme-provider.tsx";
import Layout from '@/Layouts/Layout';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/*/*.jsx', { eager: true });
    const page = pages[`./Pages/${name}.jsx`];

    const PageComponent = page.default;
    PageComponent.layout = (page) => <Layout>{page}</Layout>;

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
