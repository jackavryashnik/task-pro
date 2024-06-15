import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import ScreenPage from '../ScreensPage/ScreensPage';

import Modal from 'react-modal';
import css from './HomePage.module.css';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { fetchBoards } from '../../redux/tasks/operations';

Modal.setAppElement('#root');

const HomePage = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleCloseSidebar = () => {
    if (!isHidden && !isModalOpen) setIsHidden(true);
  };

  const openModal = content => {
    if (content) {
      setModalContent(content);
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setModalContent('');
    setIsModalOpen(false);
  };
  return (
    <div className={css.homeWrapper}>
      <div className={css.homePage}>
        <div className={clsx([css.sidebarWrapper, !isHidden && css.show])}>
          <Sidebar
            className={css.sidebar}
            openModal={openModal}
            closeModal={closeModal}
          />
        </div>
        <div
          className={clsx([css.main, !isHidden && css.showSidebar])}
          onClick={handleCloseSidebar}
        >
          <Header
            openModal={openModal}
            closeModal={closeModal}
            isHidden={isHidden}
            setter={setIsHidden}
          />
          <ScreenPage openModal={openModal} closeModal={closeModal} />
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className={css.modal}
            overlayClassName={css.overlay}
          >
            {modalContent}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
