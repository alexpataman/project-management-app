import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FEATURES } from '../../../../constants/features';

import './Features.scss';

export const Features = () => {
  const { t } = useTranslation();

  return (
    <section className="Features">
      <Container maxWidth="xl" className="content">
        <Grid
          container
          justifyContent="space-around"
          alignContent="center"
          className="items"
          spacing={4}
        >
          {FEATURES.map((el, index) => (
            <Grid item xs={12} sm={4} md={2} className="item" key={index}>
              <el.icon className="icon" />
              <Typography>{t(el.title)}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};
