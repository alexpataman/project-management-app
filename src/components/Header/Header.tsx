import React from 'react';
import { NavLink } from 'react-router-dom';
import { navigation } from '../../utils/constants/navigation.constants';
import { NavigationItem } from '../../types/navigation';
import './Header.scss';

export const Header = () => {
  return (
    <header className="Header">
      <div className="container">
        <nav className="navigation">
          {Object.values(navigation).map((page: NavigationItem, index: number) => (
            <NavLink to={page.link} key={index} className="navigation-link">
              {page.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
