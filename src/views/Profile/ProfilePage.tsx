import { Container } from '@mui/material';
import { useEffect, useState } from 'react';

import { users } from '../../api/backend';
import { Loader } from '../../components';
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
    // eslint-disable-next-line
  }, []);

  return (
    <Container component="main" maxWidth="xl">
      <Loader isLoading={isLoading}>{userData && <EditUser data={userData} />}</Loader>
    </Container>
  );
};

export default ProfilePage;
