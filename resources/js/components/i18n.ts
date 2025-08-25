import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ICU from "i18next-icu";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

// Optional: polyfills first if you installed them
// import "intl-pluralrules";
// import "@formatjs/intl-relativetimeformat/polyfill";

export function setupI18n(initialLng: string) {
    if (i18n.isInitialized) {
        if (initialLng && i18n.language !== initialLng) i18n.changeLanguage(initialLng);
        return i18n;
    }

    i18n
        .use(HttpBackend)
        .use(LanguageDetector)
        .use(ICU)                 // enables ICU syntax if you want it
        .use(initReactI18next)
        .init({
            lng: initialLng,        // from server to avoid a flash
            fallbackLng: "en",
            supportedLngs: ["en", "ar"],
            ns: ["common", "nav"],
            defaultNS: "common",
            load: "languageOnly",
            interpolation: { escapeValue: false },
            backend: {
                loadPath: "/locales/{{lng}}/{{ns}}.json"
            },
            detection: {
                // we still prefer the server-provided initialLng
                order: ["htmlTag", "cookie", "localStorage", "navigator"],
                caches: ["cookie", "localStorage"]
            },
            react: { useSuspense: true }
        });

    return i18n;
}
