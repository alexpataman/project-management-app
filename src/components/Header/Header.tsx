import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { navigation } from '../../utils/constants/navigation.constants';
import { NavigationItem } from '../../types/navigation';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import './Header.scss';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="Header">
      <div className="container">
        <nav className="navigation">
          {Object.values(navigation).map((page: NavigationItem, index: number) => (
            <NavLink to={page.link} key={index} className="navigation-link">
              {t(page.title)}
            </NavLink>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
};
