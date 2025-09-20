import { Page } from '@inertiajs/core'
import { route as routeFn } from 'ziggy-js';


declare module '@inertiajs/core' {
  interface PageProps extends Page<PageProps> {
    i18n: I18n,
    navigation: {
      super_categories: {
        data: SuperCategory[],
      },
    }
  }
}

type I18n = {
  locale: string,
  isRtl: boolean,
  available: string[],
  fallback: string,
  assetsBase: string,
  assetsVersion?: string | null,
  defaultNS: string,
  namespaces: string[],
}

declare global {
  var route: typeof routeFn;
}