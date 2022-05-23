import { useEffect, useState } from 'react';

import { users } from '../../api/backend';
import { Loader } from '../../components';
import { useBackendErrorCatcher } from '../../hooks/useBackendErrorCatcher';
import { User } from '../../types/api';

const UsersPage = () => {
  const backendErrorCatcher = useBackendErrorCatcher();
  const [userList, setUserList] = useState<User[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await backendErrorCatcher(users.getUsers());
      setUserList(data || []);
      setIsLoading(false);
    };
    load();
    // eslint-disable-next-line
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
