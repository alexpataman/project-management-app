import { GitHub } from '@mui/icons-material';
import { Avatar, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import './TeamMemberCard.scss';

interface ITeamMemberCard {
  img: string;
  name: string;
  description: string;
  github: string;
}

export default function TeamMemberCard(props: ITeamMemberCard) {
  const { img, name, github, description } = props;
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ textAlign: 'center' }}
      className="TeamMemberCard"
    >
      <Grid item>
        <Avatar src={img} alt={name} sx={{ width: 200, height: 200 }} />
      </Grid>
      <Grid item>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Grid>
      <Grid item sx={{ p: 0 }}>
        <Button size="small" startIcon={<GitHub />} href={`https://github.com/${github}`}>
          {github}
        </Button>
      </Grid>
    </Grid>
  );
}
