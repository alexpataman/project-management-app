import { useEffect, useState } from 'react';

import { users } from '../../api/backend';
import { Loader } from '../../components';
import { useAuthControl } from '../../hooks/useAuthControl';
import { useAppSelector } from '../../store/hooks';
import { getUserState } from '../../store/user/user.slice';
import { User } from '../../types/api';
import { EditUser } from './components/EditUser/EditUser';

const ProfilePage = () => {
  const authControl = useAuthControl();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useAppSelector(getUserState);

  useEffect(() => {
    const load = async () => {
      const data = await authControl(users.getUser(id));
      setUserData(data || null);
      setIsLoading(false);
    };
    load();
  }, []);

  return (
    <>
      <Loader isLoading={isLoading}>{userData && <EditUser data={userData} />}</Loader>
    </>
  );
};

export default ProfilePage;
