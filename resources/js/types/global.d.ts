import { Page } from '@inertiajs/core'

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


type Category = {
  id: number,
  name: string,
  description: string | null,
  super_category?: SuperCategory,
  products?: Product[],
  created_at: string,
  updated_at: string,
}

type OptionAttribute = {
  id: number,
  name: string,
  value: string,
  description?: string | null,
  effective_description?: string | null,
  pivot?: {
    description?: string | null,
  },
}

type OptionOptionAttribute = {
  id: number,
  description?: string | null,
  value: string,
}

type Option = {
  id: number,
  name: string,
  price: string | number,
  option_attributes: OptionAttribute[],
  created_at: string,
  updated_at: string,
}

type Product = {
  id: number,
  name: string,
  description: string | null,
  category?: Category,
  options?: Option[],
  tags?: Tag[],
  Images?: ProductImage[],
  created_at: string,
  updated_at: string,
}

type SuperCategory = {
  id: number,
  name: string,
  description: string | null,
  categories: Category[],
  created_at: string,
  updated_at: string,
}

type Tag = {
  id: number,
  name: string,
  description: string | null,
  products?: Product[],
  created_at: string,
  updated_at: string,
}

type ProductImage = {
  id: number,
  url: string,
  thumb: string,
}

type VariantPickerProps = {
  /** Your options array, as provided */
  options: Option[],
  /** Controlled selected option id (optional) */
  value?: number | null,
  /** Called with the full selected option object (or null) */
  onChange?: (option: Option | null) => void,
  /** Currency code for price formatting (defaults to MAD) */
  currency?: string,
  /** Extra className for the outer Card */
  className?: string,
  /** Optional label above the list */
  label?: string,
  /** Optional label when no options are available */
  no_options_available_label?: string,
}