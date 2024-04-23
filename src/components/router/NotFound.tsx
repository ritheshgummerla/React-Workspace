import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
const NotFound: React.FC = () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();

  // const backToHomeClick = () => {
  //   navigate('/');
  // };

  return (
    <div className="no-data no-data-found items-center">
      <h3 className="title text-14">
        {t('Oops the page you were looking for does not exist')}
      </h3>
      <p className="title-2 mb-14">
        {t('You may have mistyped the address or the page may have moved')}
      </p>
      {/* <Button variant="primary" onClick={backToHomeClick}>
        Take me back to Home
      </Button> */}
    </div>
  );
};

export default NotFound;
