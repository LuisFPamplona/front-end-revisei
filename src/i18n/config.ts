import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

export const LANGUAGE_STORAGE_KEY = "revisei-language";

const SUPPORTED_LANGUAGES = ["pt", "en"] as const;
const DEFAULT_LANGUAGE = "pt";

const getInitialLanguage = () => {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (
    storedLanguage &&
    SUPPORTED_LANGUAGES.includes(storedLanguage as (typeof SUPPORTED_LANGUAGES)[number])
  ) {
    return storedLanguage;
  }

  const browserLanguage = navigator.language.toLowerCase().split("-")[0];

  if (
    SUPPORTED_LANGUAGES.includes(browserLanguage as (typeof SUPPORTED_LANGUAGES)[number])
  ) {
    return browserLanguage;
  }

  return DEFAULT_LANGUAGE;
};

void i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (language) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
});

export default i18n;
