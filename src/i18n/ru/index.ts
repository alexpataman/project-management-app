import { ABOUT } from './about';
import { FEATURES } from './features';
import { WELCOME } from './welcome';

export default {
  translation: {
    ...ABOUT,
    ...FEATURES,
    ...WELCOME,
    // temp values, will be removed
    LANG_HOME: 'Главная',
    LANG_HOMEPAGE: 'Главная страница',
    LANG_BOARDS: 'Доски',
    LANG_BOARD: 'Доска',
    // normal values
    LANG_LOGIN_TEXT: 'Вход',
    LANG_LOGOUT_TEXT: 'Выход',
    LANG_REGISTRATION_TEXT: 'Регистрация',
    LANG_USER_HAS_ACCOUNT_TEXT: 'У меня уже есть учетная запись',
    LANG_USER_HAS_NO_ACCOUNT_TEXT: 'У меня нет учетной записи',
    LANG_SUBMIT_BUTTON_TEXT: 'Отправить',
    LANG_FIELD_IS_REQUIRED: 'Данное поле является обязательным',
    LANG_FIELD_LABEL_NAME: 'Имя',
    LANG_FIELD_LABEL_EMAIL: 'Электронная почта',
    LANG_FIELD_LABEL_PASSWORD: 'Пароль',
    LANG_FIELD_MUST_BE_VALID_EMAIL: 'Введите корректный адрес',
    LANG_LOGGED_IN_TEXT: 'Вы авторизированы',
    LANG_FIELD_LABEL_LOGIN: 'Логин',
    // errors
    LANG_FORBIDDEN_ERROR: 'Логин или пароль не верны',
    LANG_USER_EXISTS_ERROR: 'Пользователь с таким логином уже существует',
  },
};
