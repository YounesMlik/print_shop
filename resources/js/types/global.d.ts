import { Page } from '@inertiajs/core'
import { route as routeFn } from 'ziggy-js';
import { FixedLengthArray, SetRequired } from "type-fest"
import { Schema } from '@coltorapps/builder';
import { formBuilder } from '@/components/form_builder/builder';


declare module '@inertiajs/core' {
  interface PageProps extends Page<PageProps> {
    i18n: I18n,
    navigation: {
      super_categories: {
        data: SetRequired<SuperCategory, "categories">[],
      },
    }
  }
}

type FormBuilderSchema = Schema<typeof formBuilder>;

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

type ResourceCollection<T, L extends number> = {
  data: FixedLengthArray<T, L>,
  links: {
    first: string,
    last: string,
    prev: string | null,
    next: string | null,
  },
  meta: NavData,
}

type NavData = {
  current_page: number,
  from: number,
  last_page: number,
  links: NavLinks,
  path: string,
  per_page: number,
  to: number,
  total: number,
}

type NavLinks =
  [
    PreviousLink,
    ...(NavLink | NavEllipsis)[],
    NextLink,
  ]

type NavLink = { url: string, label: `${number}`, active: boolean }
type PreviousLink = { url: string | null, label: string, active: false }
type NextLink = { url: string | null, label: string, active: false }
type NavEllipsis = { url: null, label: "...", active: false }

declare global {
  var route: typeof routeFn
}