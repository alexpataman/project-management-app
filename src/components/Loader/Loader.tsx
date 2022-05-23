import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactNode } from 'react';

interface ILoader {
  isLoading: boolean;
  children: ReactNode;
}

export const Loader = ({ children, isLoading }: ILoader) => (
  <>
    {isLoading ? (
      <Box sx={{ display: 'flex' }} justifyContent="center">
        <CircularProgress />
      </Box>
    ) : (
      children
    )}
  </>
);
