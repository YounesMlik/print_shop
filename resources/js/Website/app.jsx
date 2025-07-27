import React from 'react';
import { createRoot } from 'react-dom/client';
import { InertiaApp } from '@inertiajs/inertia-react';
import { ThemeProvider } from "@/components/theme-provider.tsx";
import Layout from '@/Layouts/Layout';

const el = document.getElementById('app');
const root = createRoot(el);

root.render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <InertiaApp
      initialPage={JSON.parse(el.dataset.page)}
      resolveComponent={(name) => {
        const pages = import.meta.glob('./Pages/*/*.jsx', { eager: true });
        const page = pages[`./Pages/${name}.jsx`];

        return (props) => <Layout><page.default {...props} /></Layout>;
      }}
    />
  </ThemeProvider>
)