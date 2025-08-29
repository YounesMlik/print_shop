import { Page } from '@inertiajs/core'

declare module '@inertiajs/core' {
    interface PageProps extends Page<PageProps> {
        i18n: I18n;
    }
}

type I18n = {
    locale: string;
    isRtl: boolean;
    available: string[];
    fallback: string;
    assetsBase: string;
    assetsVersion?: string | null;
    defaultNS: string;
    namespaces: string[];
};

type OptionAttribute = {
  id: number;
  name: string;
  value: string;
  description?: string | null;
  effective_description?: string | null;
  pivot?: { description?: string | null };
  // allow extra fields without breaking
  [k: string]: any;
};

type Option = {
  id: number;
  name?: string | null;
  price?: string | number | null;
  option_attributes: OptionAttribute[];
  [k: string]: any;
};

type VariantPickerProps = {
  /** Your options array, as provided */
  options: Option[];
  /** Controlled selected option id (optional) */
  value?: number | null;
  /** Called with the full selected option object (or null) */
  onChange?: (option: Option | null) => void;
  /** Currency code for price formatting (defaults to MAD) */
  currency?: string;
  /** Extra className for the outer Card */
  className?: string;
  /** Optional label above the list */
  label?: string;
  /** Optional label when no options are available */
  no_options_available_label?: string;
};