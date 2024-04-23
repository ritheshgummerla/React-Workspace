import React from 'react';
import { NavLink } from 'react-router-dom';
import menuItems from '../common/json/menuItems.json';

const NavigationItems = menuItems.data;

// const permisions

interface INavigationItems {
  id: number;
  name: string;
  url: string;
  icon: string;
  permission?: string;
}

const Navigation: React.FC = () => {
  return (
    <nav className="navigation-wrapper">
      {NavigationItems?.map((item: INavigationItems) => {
        return (
          <React.Fragment key={item.id + '-nav-items'}>
              {item.permission ==='manager' ? (
              <></>
            ) : (
            <NavLink
            style={{marginRight:"40px"}}
              to={item.url}
              className={({ isActive, isPending }) =>
                isPending ? 'pending' : isActive ? 'active' : ''
              }
            >
              {item.name}
            </NavLink>
            )
      }
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Navigation;
