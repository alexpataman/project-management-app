import { useEffect, useState } from 'react';

import { users } from '../../api/Backend';
import { Loader } from '../../components';
import { useAuthControl } from '../../hooks/useAuthControl';
import { User } from '../../types/api';

const UsersPage = () => {
  const authControl = useAuthControl();
  const [userList, setUserList] = useState<User[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await authControl(users.getUsers());
      setUserList(data || []);
      setIsLoading(false);
    };
    load();
  }, []);

  return (
    <>
      <Loader isLoading={isLoading}>
        UsersPage
        <ul>
          {userList?.map((el) => (
            <li key={el.id}>
              {el.name} - {el.login}
            </li>
          ))}
        </ul>
      </Loader>
    </>
  );
};

export default UsersPage;
