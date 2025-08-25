import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ICU from "i18next-icu";
import HttpBackend from "i18next-http-backend";

type I18nProps = {
    locale: string;
    isRtl: boolean;
    available: string[];
    fallback: string;
    assetsBase: string;
    assetsVersion?: string | null;
    defaultNS: string;
    namespaces: string[];
};

export function setupI18n(i18nProps: I18nProps) {
    const { locale, available, fallback, assetsBase, assetsVersion, defaultNS, namespaces } = i18nProps;

    if (i18n.isInitialized) {
        if (locale && i18n.language !== locale) i18n.changeLanguage(locale);
        return i18n;
    }

    const v = assetsVersion ? `?v=${assetsVersion}` : "";

    i18n
        .use(HttpBackend)
        .use(ICU)
        .use(initReactI18next)
        .init({
            lng: locale,
            fallbackLng: fallback,
            supportedLngs: available,
            ns: namespaces,
            defaultNS,
            load: "languageOnly",
            interpolation: { escapeValue: false },
            backend: { loadPath: `${assetsBase}/{{lng}}/{{ns}}.json${v}` },
            react: { useSuspense: true },
        });

    return i18n;
}
