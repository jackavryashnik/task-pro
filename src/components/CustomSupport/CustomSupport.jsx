import css from './CustomSupport.module.css';
import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';

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
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_112_676)">
            <path
              d="M9.99996 18.3332C14.6023 18.3332 18.3333 14.6022 18.3333 9.99984C18.3333 5.39746 14.6023 1.6665 9.99996 1.6665C5.39759 1.6665 1.66663 5.39746 1.66663 9.99984C1.66663 14.6022 5.39759 18.3332 9.99996 18.3332Z"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.57495 7.49999C7.77087 6.94304 8.15758 6.47341 8.66658 6.17426C9.17558 5.87512 9.77403 5.76577 10.3559 5.86558C10.9378 5.96539 11.4656 6.26792 11.8458 6.71959C12.2261 7.17126 12.4342 7.74292 12.4333 8.33332C12.4333 9.99999 9.93328 10.8333 9.93328 10.8333"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 14.1665H10.0125"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_112_676">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p className={css.helpText}>Need help?</p>
      </div>
    </div>
  );
};

export default CustomSupport;
