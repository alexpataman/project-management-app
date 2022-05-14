import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './BoardsPage.scss';

interface IBoard {
  title: string;
  background: number;
}

export const BoardsPage = () => {
  const { t } = useTranslation();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedBG, setSelectedBG] = useState(0);
  const [boards, setBoards] = useState([] as IBoard[]);

  const openCreationModal = () => {
    setIsModalOpened(true);
  };

  const closeCreationModal = () => {
    setSelectedBG(0);
    setIsModalOpened(false);
  };

  const createBoard = (e: React.FormEvent) => {
    e.preventDefault();
    const titleInput = document.querySelector('input');
    const title = String(titleInput?.value);

    const boardInfo: IBoard = {
      title: title,
      background: selectedBG,
    };

    setBoards([...boards, boardInfo]);
    closeCreationModal();
  };

  return (
    <section className="BoardsPage">
      <>
        {!isModalOpened ? (
          ''
        ) : (
          <div className="modal-container">
            <div className="modal__title-wrapper">
              <h3 className="modal__title">Создать доску</h3>
              <button className="modal__close" onClick={closeCreationModal}></button>
            </div>

            <div className="modal__wrapper">
              <h4 className="modal__title">
                Заголовок доски<span>*</span>
              </h4>
              <input type="text" className="title-input" />
              <h5 className="modal__title">👋 Укажите название доски.</h5>
            </div>

            <div className="modal__wrapper">
              <h4 className="modal__title">Фон</h4>
              <div className="background-container">
                {Array.from(Array(6).keys()).map((i) => (
                  <div
                    className={`bg-select bg-${i} ${i == selectedBG ? 'selected' : ''}`}
                    key={i}
                    onClick={() => setSelectedBG(i)}
                  ></div>
                ))}
              </div>
            </div>

            <button className="modal__submit" onClick={createBoard}>
              Создать
            </button>
          </div>
        )}
      </>

      <h2 className="BoardPage__title">ВАШИ РАБОЧИЕ ПРОСТРАНСТВА:</h2>
      <div className="container">
        {boards.map((board, i) => (
          <div className={`board bg-${board.background}`} key={i}>
            <div className="board__overlay"></div>
            <h2 className="board__title">{board.title}</h2>

            <div className="board__delete"></div>
          </div>
        ))}

        <div className="board board__create" onClick={openCreationModal}>
          <div className="board__overlay"></div>
          <h2 className="board__title">Создать доску</h2>
        </div>
      </div>
    </section>
  );
};

export default BoardsPage;
