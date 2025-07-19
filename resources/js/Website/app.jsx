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
      resolveComponent={name => import(`./Pages/${name}`).then(module => module.default)}
    />
  </ThemeProvider>
);
