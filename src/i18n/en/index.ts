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
    LANG_HOME: 'Home',
    LANG_HOMEPAGE: 'Home page',
    LANG_BOARDS: 'Boards',
    LANG_BOARD: 'Board',
  },
};
