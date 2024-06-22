import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./lang/en";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: en
        },
        fallbackLng: "en",
        lng: localStorage.getItem("i18nextLng") || "en",
    })

export default i18n;