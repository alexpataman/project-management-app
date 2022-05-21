import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import homeImg from '../../../../assets/img/home.jpeg';

import './Welcome.scss';

export const Welcome = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <section className="Welcome">
        <div className="content">
          <Typography variant="h1">{t('WELCOME_TITLE')}</Typography>
          <Typography>{t('WELCOME_DESCRIPTION')}</Typography>
          <Typography>{t('WELCOME_DESCRIPTION2')}</Typography>
          <Button variant="contained" size="large" to="/textbook" component={Link}>
            {t('WELCOME_TRY_BUTTON')}
          </Button>
        </div>
        <div className="image">
          <img src={homeImg} alt="home" />
        </div>
      </section>
    </div>
  );
};
