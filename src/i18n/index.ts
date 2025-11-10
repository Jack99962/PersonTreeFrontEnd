import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import zhTranslations from './locales/zh.json';

// 从 localStorage 获取保存的语言，如果没有则使用默认语言 'en'
const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
// 验证语言是否支持，如果不支持则使用默认语言
const defaultLanguage = ['en', 'zh'].includes(savedLanguage) ? savedLanguage : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      zh: {
        translation: zhTranslations,
      },
    },
    lng: defaultLanguage, // 默认语言为英文
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React 已经转义了值
    },
  });

// 监听语言变化，保存到 localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;

