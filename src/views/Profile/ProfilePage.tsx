import { Container } from '@mui/material';
import { useEffect, useState } from 'react';

import { users } from '../../api/backend';
import { Loader } from '../../components';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { useBackendErrorCatcher } from '../../hooks/useBackendErrorCatcher';
import { useAppSelector } from '../../store/hooks';
import { getUserState } from '../../store/user/user.slice';
import { User } from '../../types/api';
import { EditUser } from './components/EditUser/EditUser';

const ProfilePage = () => {
  const backendErrorCatcher = useBackendErrorCatcher();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useAppSelector(getUserState);

  useEffect(() => {
    const load = async () => {
      const data = await backendErrorCatcher(users.getUser(id));
      setUserData(data || null);
      setIsLoading(false);
    };
    load();
  }, []);

  return (
    <Container component="main" maxWidth="xl">
      <Loader isLoading={isLoading}>
        {userData && (
          <ErrorBoundary>
            <EditUser data={userData} />
          </ErrorBoundary>
        )}
      </Loader>
    </Container>
  );
};

export default ProfilePage;
