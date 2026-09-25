import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'
import pt from './locales/pt.json'

export const SUPPORTED_LANGUAGES = ['pt', 'en', 'es'] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'pt',
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'gcpcorp-language',
    },
  })

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language
})

export default i18n
