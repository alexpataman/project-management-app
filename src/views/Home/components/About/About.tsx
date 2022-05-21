import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ava1 from '../../../../assets/img/team_1.jpeg';
import ava2 from '../../../../assets/img/team_2.jpeg';
import ava3 from '../../../../assets/img/team_3.jpeg';
import { GITHUB_ACCOUNTS } from '../../../../constants/team';
import TeamMemberCard from '../TeamMemberCard/TeamMemberCard';

import './About.scss';

export const About = () => {
  const { t } = useTranslation();
  const team = [
    {
      name: t('ALEXANDER_PATAMAN_NAME'),
      img: ava1,
      github: GITHUB_ACCOUNTS.ALEXANDER_PATAMAN,
      description: t('ALEXANDER_PATAMAN_CONTRIBUTION'),
    },
    {
      name: t('DANIYAR_TELENGUTOV_NAME'),
      img: ava2,
      github: GITHUB_ACCOUNTS.DANIYAR_TELENGUTOV,
      description: t('DANIYAR_TELENGUTOV_CONTRIBUTION'),
    },
    {
      name: t('ARTUR_SARATOVKIN_NAME'),
      img: ava3,
      github: GITHUB_ACCOUNTS.ARTUR_SARATOVKIN,
      description: t('ARTUR_SARATOVKIN_CONTRIBUTION'),
    },
  ];

  return (
    <div className="container">
      <div className="About">
        <Typography variant="h2">{t('ABOUT_TITLE')}</Typography>
        <Grid container justifyContent="space-around" spacing={2}>
          {team.map((el, index) => (
            <Grid item xs={12} sm={6} md={3} className="TeamMemberItem" key={index}>
              <TeamMemberCard
                name={el.name}
                img={el.img}
                description={el.description}
                github={el.github}
              ></TeamMemberCard>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
