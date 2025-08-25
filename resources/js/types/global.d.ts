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