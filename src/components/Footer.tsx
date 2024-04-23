import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="home-page">
      <h1>{t('This is footer')}</h1>
    </div>
  );
};

export default Footer;
