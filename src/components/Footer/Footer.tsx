import { GitHub } from '@mui/icons-material';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

import { EXTERNAL_LINKS } from '../../constants';
import { GITHUB_ACCOUNTS } from '../../constants/team';

import './Footer.scss';

const credentials = Object.values(GITHUB_ACCOUNTS);

export const Footer = () => (
  <footer className="Footer">
    <Container maxWidth="xl" className="content">
      <div>
        <a href={EXTERNAL_LINKS.rsSchool} target="_blank" rel="noreferrer" className="rs-link">
          RS School
        </a>
      </div>
      <div className="credentials">
        {credentials.map((el, index) => (
          <Button
            size="small"
            startIcon={<GitHub />}
            href={`${EXTERNAL_LINKS.github}/${el}`}
            key={index}
            target="_blank"
          >
            <span className="nickname">{el}</span>
          </Button>
        ))}
      </div>
      <div className="copy-link">&copy;&nbsp;2022</div>
    </Container>
  </footer>
);
