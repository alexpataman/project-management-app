import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import './LanguageSwitcher.scss';

// TODO: temp version, just to test translations
const lngs: { [key: string]: string } = {
  en: 'En',
  ru: 'Ru',
};

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="LanguageSwitcher">
      {Object.keys(lngs).map((lng) => (
        <a
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          className={classnames('link', { active: i18n.resolvedLanguage === lng })}
        >
          {lngs[lng]}
        </a>
      ))}
    </div>
  );
};
