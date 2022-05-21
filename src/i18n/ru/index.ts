import { ABOUT } from './about';
import { FEATURES } from './features';
import { USER } from './user';
import { WELCOME } from './welcome';

export default {
  translation: {
    ...ABOUT,
    ...FEATURES,
    ...WELCOME,
    ...USER,
    // temp values, will be removed
    LANG_HOME: 'Главная',
    LANG_HOMEPAGE: 'Главная страница',
    LANG_BOARDS: 'Доски',
    LANG_BOARD: 'Доска',
  },
};
