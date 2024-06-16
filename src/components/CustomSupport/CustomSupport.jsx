import css from './CustomSupport.module.css';
import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';
import icons from '../../images/icons.svg';
import NeedHelp from '../NeedHelp/NeedHelp';

const CustomSupport = ({ openModal, closeModal }) => {
  const handleHelpClick = () => {
    openModal(<NeedHelp closeModal={closeModal} />);
  };

  return (
    <div className={css.component}>
      <img
        src={cactus}
        width={54}
        height={78}
        srcSet={`${cactus} 1x, ${cactus2x} 2x`}
        alt="Cactus"
        className={css.cactus}
      />
      <p className={css.text}>
        If you need help with <span className={css.brandName}>TaskPro</span>,
        check out our support resources or reach out to our customer support
        team.
      </p>
      <div className={css.help} onClick={handleHelpClick}>
        <svg width={20} height={20}>
          <use href={`${icons}#icon-help-circle`}></use>
        </svg>
        <p className={css.helpText} style={{ cursor: 'pointer' }}>
          Need help?
        </p>
      </div>
    </div>
  );
};

export default CustomSupport;
