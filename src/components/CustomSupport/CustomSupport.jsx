import css from './CustomSupport.module.css';
import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';
import icons from '../../images/icons.svg';

const CustomSupport = () => {
  return (
    <div className={css.component}>
      <img
        src={cactus}
        srcSet={`${cactus} 1x, ${cactus2x} 2x`}
        alt="Cactus"
        className={css.cactus}
      />
      <p className={css.text}>
        If you need help with <span className={css.brandName}>TaskPro</span>,
        check out our support resources or reach out to our customer support
        team.
      </p>
      <div className={css.help}>
        <svg width={20} height={20}>
          <use href={`${icons}#icon-help-circle`}></use>
        </svg>
        <p className={css.helpText}>Need help?</p>
      </div>
    </div>
  );
};

export default CustomSupport;
