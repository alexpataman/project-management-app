import Portal from '@mui/material/Portal';
import { useState } from 'react';

import { SearchModal } from '../components/SearchModal/SearchModal';

export const useSearchModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const SearchPortal = (
    <>
      {isModalOpen && (
        <Portal>
          <SearchModal closeModal={() => setIsModalOpen(false)} />
        </Portal>
      )}
    </>
  );

  return { SearchPortal, setIsModalOpen };
};
