import React from 'react';
import { useTranslation } from 'react-i18next';

const ContactUs: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="home-page">
      <h1 className="text-pc-1">{t('This is Contact us page.')}</h1>
    </div>
  );
};

export default ContactUs;
