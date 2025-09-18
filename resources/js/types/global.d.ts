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

type VariantPickerProps = {
  /** Your options array, as provided */
  options: Option[],
  /** Controlled selected option id */
  selectedOption: Option | null,
  /** Controlled quantity */
  quantity: number,
  /** Called with the full selected option object (or null) */
  onOptionChange: (selected: Option | null) => void,
  /** Called with the quantity */
  onQuantityChange: (quantity: number) => void,
  /** Currency code for price formatting (defaults to MAD) */
  currency?: string,
  /** Extra className for the outer Card */
  className?: string | undefined,
  /** Optional label above the list */
  label?: string,
  /** Optional label when no options are available */
  no_options_available_label?: string,
}

declare global {
  var route: typeof routeFn;
}