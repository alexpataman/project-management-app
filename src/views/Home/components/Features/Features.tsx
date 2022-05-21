import FactCheckIcon from '@mui/icons-material/FactCheck';
import GroupAdd from '@mui/icons-material/GroupAdd';
import InsightsSharpIcon from '@mui/icons-material/InsightsSharp';
import LockIcon from '@mui/icons-material/Lock';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import './Features.scss';

export const Features = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: TagFacesIcon,
      title: t('FEATURE_SIMPLICITY_DESCRIPTION'),
    },
    {
      icon: FactCheckIcon,
      title: t('FEATURE_STATUS_DESCRIPTION'),
    },
    {
      icon: InsightsSharpIcon,
      title: t('FEATURE_PROGRESS_DESCRIPTION'),
    },
    {
      icon: GroupAdd,
      title: t('FEATURE_USERS_DESCRIPTION'),
    },
    {
      icon: LockIcon,
      title: t('FEATURE_SAFE_DESCRIPTION'),
    },
  ];

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
          {features.map((el, index) => (
            <Grid item xs={12} sm={4} md={2} className="item" key={index}>
              <el.icon className="icon" />
              <Typography>{el.title}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};
