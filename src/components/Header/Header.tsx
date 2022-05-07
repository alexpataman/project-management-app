import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { LanguageSwitcher } from '..';
import { NavigationItem } from '../../types/navigation';
import { navigation } from '../../utils/constants/navigation.constants';

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
