import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translations
import transEN from "@/translations/en.json";
import transVI from "@/translations/vi.json";
//

const resources = {
  en: {
    translation: transEN,
  },
  vi: {
    translation: transVI,
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
