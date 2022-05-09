import { useAppSelector } from '../store/hooks';
import { getUserState } from '../store/user/user.slice';

export const useIsGuest = () => {
  const { isGuest } = useAppSelector(getUserState);

  return isGuest;
};
