// i18next.d.ts
import 'i18next';

import en from 'public/locales/en/common.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: {
            translation: typeof en; // or merge your namespaces if you split files
        };
    }
}
