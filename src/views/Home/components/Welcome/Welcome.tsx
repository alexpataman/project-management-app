import { Button, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import homeImg from '../../../../assets/img/home.jpeg';
import { PATH } from '../../../../constants';
import { useIsGuest } from '../../../../hooks/useIsGuest';

import './Welcome.scss';

export const Welcome = () => {
  const { t } = useTranslation();
  const isGuest = useIsGuest();
  return (
    <Container maxWidth="xl" className="content">
      <section className="Welcome">
        <div className="content">
          <Typography variant="h1">{t('WELCOME_TITLE')}</Typography>
          <Typography>{t('WELCOME_DESCRIPTION')}</Typography>
          <Typography>{t('WELCOME_DESCRIPTION2')}</Typography>
          <Button
            variant="contained"
            size="large"
            to={isGuest ? PATH.login : PATH.boards}
            component={Link}
          >
            {t('WELCOME_TRY_BUTTON')}
          </Button>
        </div>
        <div className="image">
          <img src={homeImg} alt="home" />
        </div>
      </section>
    </Container>
  );
};
