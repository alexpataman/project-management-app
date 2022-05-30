import { GITHUB_ACCOUNTS } from './team';

export const authorName = 'Команда разработки:';
export const authorLink = `@${GITHUB_ACCOUNTS.ALEXANDER_PATAMAN}, @${GITHUB_ACCOUNTS.DANIYAR_TELENGUTOV}, @${GITHUB_ACCOUNTS.ARTUR_SARATOVKIN}`;

export const taskTitle = 'Система управления проектами\n';
export const taskLink =
  'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/react/final-task-project-management-app.md';

export const content = `
[+7] Welcome route - max 7 балов
    ✔️ На приветственной странице должны отображаться общие сведения о команде, проекте, курсе. 1 балл
    ✔️ В верхнем правом углу должны быть доступны 2 кнопки Sign In и Sign Up. 1 балл
        ==> Кнопки доступны для неавторизированного посетителя в выпадающем меню
    ✔️ При наличии неистёкшего токена, заменить кнопки Sign In и Sign Up на кнопку "Go to Main Page". 2 балла
        ==> Для авторизированного пользователя меню заменяется на ссылки "Доски", "Поиск", "Редактирование профиля" и "Выход"
    ✔️ При истечении срока жизни токена - пользователь автоматически должен быть перенаправлен на "Welcome page". 2 балла
    ✔️ Нажатие на кнопку Sign In / Sign Up автоматически перенаправляет нас на роут с формой для Sign In / Sign Up. 1 балл
[+9] Sign In / Sign Up - max 8 балов
    ✔️ Кнопки для Sign In / Sign Up / Sign Out есть везде где они предусмотрены 2 балл
    ✔️ Поля форм должны быть реализованы в соответствии с api backend приложения. Должна быть реализована валидация. 4 баллов
    ✔️ При успешном логине пользователь должен быть перенаправлен на "Main route" 1 балл
    ✔️ Если пользователь залогинен, то при попытке пройти на эти роуты он должен быть перенаправлен на Main route. 1 баллов
[+9] Main route max 8 балов
    ✔️ Функционал создания борды 2 балла
    ✔️ Отображает борды списком. 1 балл
    ✔️ Борды отображаются с маленьким превью из доступной информации (title, description, etc). По клику на элемент переходим на board item (Board route). Также должна присутствовать кнопка для удаления борды. 1 балл
    ✔️ При попытке удаления борды мы должны получить Confirmation modal в котором должны подтвердить серёзность наших намерений. Confirmation modal должен быть универсальным компонентом (одним на всё приложение). 1 балл
    ✔️ Реализован функционал редактирования профиля пользователя. 3 балла
[+26] Board route max 26 балов
    ✔️ Должны присутствовать кнопки для создания колонки. 1 балл
    ✔️ Если к борде привязана хотябы одна колонка - отображаем / делаем доступной также и кнопку создания таски. 1 балл
    ✔️ Для создания колонки / таска используются формы, отображаемые в модальных окнах. 3 балла
    ✔️ При переполнении количеством тасок колонки - скролл внутри колонки. 2 балл
    ✔️ Страница на данном роуте не должна иметь вертикального скролла. 1 балл
    ✔️ С помощью drag-n-drop мы можем менять колонки местами. 3 балла
    ✔️ С помощью drag-n-drop мы можем менять очерёдность тасок в рамках колонки. 3 балла
    ✔️ С помощью drag-n-drop мы можем менять принадлежность таски к колонке. 5 балл
    ✔️ Реализован функционал просмотра, и редактирования всего содержимого таски. 3 балла
    ✔️ Реализовать возможность удалить таск. Кнопка delete task должна быть расположена в удобном для пользователя месте. При нажатии: confirmation modal -> удаление. 1 балл
    ✔️ Вверху колонки должен быть Title. При нажатии на него он из текста должен превращаться в input, слева от которого будут кнопки Submit и Cancel. После ввода текста в input и нажатия submit - Title колонки должен поменяться. 2 балла
    ✔️ На колонке должна присутствовать кнопка delete. По нажатию - Confirmation modal - при апруве - удаление. 1 балл
[+11] Общие требования max 11 балов
    ✔️ Ошибки со стороны BE - (Not found, unhandled rejection, etc) должны отображаться пользователю в user-friendly формате (toast, pop-up или что-то подобное, на ваше усмотрение). 5 балла
    ✔️ Локализация 2 балла
    ✔️ Backend задеплоен 1 балл
    ✔️ sticky-Header 1 балл
    ✔️ Доп. функционал (соразмерный глобальному поиску) 2 балла
        ==> Реализован глобальный поиск по таскам
        ==> Реализована возможность редактирования бордов + установка изображения для фона для бордов
`;

export const myScore = 60;
export const maxScore = 60;
export const resultScore = myScore > maxScore ? maxScore : myScore;
