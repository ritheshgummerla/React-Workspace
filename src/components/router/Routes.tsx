import React, { Suspense } from 'react';
import { Routes as ReactRoute, Route } from 'react-router-dom';
import Header from '../Header';
import NotFound from './NotFound';
import Loader from '../Loader';
import Page from './Page';
import { APP_CONSTANTS, SYSTEM_CONSTANTS } from '../../common/constants';

const HomePage = React.lazy(() => import('../../pages/HomePage'));
const ContactUs = React.lazy(() => import('../../pages/ContactUs'));
const ROUTES = [
  {
    path: '/',
    exact: true,
    component: HomePage,
    title: 'Home page | ' + SYSTEM_CONSTANTS.APP_NAME,
  },
  {
    path: '/contact_us',
    exact: true,
    component: ContactUs,
    title: 'Contact Us | ' + SYSTEM_CONSTANTS.APP_NAME,
    role: APP_CONSTANTS.ROLE,
  },
  {
    path: '*',
    exact: true,
    component: NotFound,
    title: 'Page Not Found | ' + SYSTEM_CONSTANTS.APP_NAME,
  },
];

const Routes: React.FC = () => {
  return (
    <>
      {/* For Showing Loader at component to Global level*/}
      <div id="dd-global-loader"></div>
      <Header />
      <div className="container-inner page-content">
        <Suspense fallback={<Loader />}>
          <ReactRoute>
            {ROUTES?.map((route, i: number) => {
              return route.role ? null : (
                <Route
                  key={i}
                  path={route.path}
                  element={
                    <Page
                      component={route.component}
                      title={route.title}
                      exact={route.exact}
                    />
                  }
                />
              );
            })}
          </ReactRoute>
        </Suspense>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Routes;
