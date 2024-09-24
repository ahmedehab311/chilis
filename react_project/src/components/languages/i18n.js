import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ar from "./ar.json";

const language = localStorage.getItem("lan") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
  lng: language, 
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;