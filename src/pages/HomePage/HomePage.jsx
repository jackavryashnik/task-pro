import { useState } from 'react';
import Modal from 'react-modal';
import Sidebar from '../../components/Sidebar/Sidebar';
import css from './HomePage.module.css';
Modal.setAppElement('#root');

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = content => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  return (
    <>
      <div>HomePage</div>
      <Sidebar openModal={openModal} closeModal={closeModal} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={css.modal}
        overlayClassName={css.overlay}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default HomePage;
