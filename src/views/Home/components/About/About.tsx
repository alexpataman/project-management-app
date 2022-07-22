import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { TEAM_DATA } from '../../../../constants/team';
import TeamMemberCard from '../TeamMemberCard/TeamMemberCard';

import './About.scss';

export const About = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl">
      <div className="About">
        <Typography variant="h2">{t('ABOUT_TITLE')}</Typography>
        <Grid container justifyContent="space-around" spacing={2}>
          {TEAM_DATA.map((el, index) => (
            <Grid item xs={12} sm={6} md={3} className="TeamMemberItem" key={index}>
              <TeamMemberCard
                name={t(el.name)}
                img={el.img}
                description={t(el.description)}
                github={el.github}
              ></TeamMemberCard>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};
