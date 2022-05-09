import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { LanguageSwitcher } from '..';
import { LINKS } from '../../constants';
import { useIsGuest } from '../../hooks/useIsGuest';

import './Header.scss';

export const Header = () => {
  const { t } = useTranslation();
  const isGuest = useIsGuest();

  return (
    <header className="Header">
      <div className="container">
        <nav className="navigation">
          {LINKS.map((page, index: number) => (
            <NavLink to={page.to} key={index} className="navigation-link">
              {t(page.title)}
            </NavLink>
          ))}
        </nav>
        <LanguageSwitcher />
        {isGuest ? 'Гость' : 'Авторизирован'}
      </div>
    </header>
  );
};
