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

  const toggleSidebar = () => {
    if (!isModalOpen) {
      setIsHidden(!isHidden);
    }
  };

  const toggleModal = content => {
    setIsModalOpen(!isModalOpen);
    setModalContent(content ? content : '');
  };

  return (
    <div className={css.homePage}>
      <div className={clsx([css.sidebarWrapper, !isHidden && css.show])}>
        <Sidebar
          isHidden={isHidden}
          className={css.sidebar}
          toggleModal={toggleModal}
        />
      </div>
      <div
        className={clsx([css.main, !isHidden && css.showSidebar])}
        onClick={toggleSidebar}
      >
        <Header isHidden={isHidden} setter={setIsHidden} />
        <ScreenPage toggleModal={toggleModal} />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => toggleModal('')}
          className={css.modal}
          overlayClassName={css.overlay}
        >
          {modalContent}
        </Modal>
      </div>
    </div>
  );
};

export default HomePage;
