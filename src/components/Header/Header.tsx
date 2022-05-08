import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { LanguageSwitcher } from '..';
import { LINKS } from '../../constants';

import './Header.scss';

export const Header = () => {
  const { t } = useTranslation();
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
      </div>
    </header>
  );
};
