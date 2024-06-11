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
  // const isOpen = useSelector(selectIsOpen);
  // const modalContent = useSelector(selectModalContent);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  };

  // const toggleModal = content => {
  //   setIsModalOpen(!isModalOpen);
  //   setModalContent(content ? content : '');
  // };
  const openModal = content => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setModalContent('');
    setIsModalOpen(false);
  };
  return (
    <div className={css.homePage}>
      <div className={clsx([css.sidebarWrapper, !isHidden && css.show])}>
        <Sidebar
          // isHidden={isHidden}
          className={css.sidebar}
          // toggleModal={toggleModal}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>
      <div
        className={clsx([css.main, !isHidden && css.showSidebar])}
        onClick={toggleSidebar}
      >
        <Header isHidden={isHidden} setter={setIsHidden} />
        <ScreenPage />
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
  );
};

export default HomePage;
