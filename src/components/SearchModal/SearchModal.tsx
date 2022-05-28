import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { search } from '../../api/backend/search';
import { PATH } from '../../constants';
import { SearchResponse } from '../../types/api';

import './SearchModal.scss';

interface ISearchModal {
  closeModal: () => void;
}

export const SearchModal = ({ closeModal }: ISearchModal) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [options, setOptions] = useState<SearchResponse[]>([]);

  const handleNavigate = (path: string) => {
    navigate(path);
    closeModal();
  };

  const loadOptions = async () => {
    const tasks = await search.getTasks();
    setOptions(tasks || []);
  };

  useEffect(() => {
    loadOptions();
  }, []);

  return (
    <Dialog onClose={closeModal} open={true} className="SearchModal">
      <DialogTitle>{t('LANG_SEARCH_TITLE')}</DialogTitle>
      <DialogContent className="content">
        <Autocomplete
          freeSolo
          disableClearable
          options={options}
          groupBy={(option) => `${option.board.title} / ${option.column.title}`}
          filterOptions={(options: SearchResponse[], state) => {
            return options.filter(
              (el) => state.inputValue && el.title.match(new RegExp(state.inputValue, 'gi'))
            );
          }}
          onChange={(event, newValue) => {
            const value = newValue as SearchResponse;
            handleNavigate(`${PATH.board}/${value.boardId}/${value.id}`);
          }}
          renderOption={(props, option: SearchResponse) => {
            return (
              <li {...props} key={option.id}>
                {option.title}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('LANG_START_TYPING_TEXT')}
              autoFocus={true}
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>{t('LANG_CLOSE_TITLE')}</Button>
      </DialogActions>
    </Dialog>
  );
};
