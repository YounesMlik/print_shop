import React from 'react';
import { createRoot } from 'react-dom/client';
import { InertiaApp } from '@inertiajs/inertia-react';
import { ThemeProvider } from "@/components/theme-provider.tsx"

const el = document.getElementById('app');
const root = createRoot(el);

root.render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <InertiaApp
      initialPage={JSON.parse(el.dataset.page)}
      resolveComponent={name => {
        const pages = import.meta.glob('./Pages/*/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`].default
      }}
    />
  </ThemeProvider>
);
