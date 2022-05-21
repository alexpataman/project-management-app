import { ABOUT } from './about';
import { BOARDS } from './boards';
import { FEATURES } from './features';
import { USER } from './user';
import { WELCOME } from './welcome';

export default {
  translation: {
    ...ABOUT,
    ...FEATURES,
    ...WELCOME,
    ...USER,
    ...BOARDS,
  },
};
