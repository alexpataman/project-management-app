import { useTranslation } from 'react-i18next';

// TODO: temp version, just to test translations
const lngs: { [key: string]: string } = {
  en: 'English',
  ru: 'Russian',
};

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="LanguageSwitcher">
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng]}
        </button>
      ))}
    </div>
  );
};
