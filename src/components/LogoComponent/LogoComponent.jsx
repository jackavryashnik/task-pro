import css from './LogoComponent.module.css';
import icon from '../../images/icons.svg';

export default function LogoComponent() {
  return (
    <div className={css.container}>
      <svg width={32} height={32}>
        <use href={`${icon}#icon-lightning-01`}></use>
      </svg>
      <h2 className={css.logo}>Task Pro</h2>
    </div>
  );
}
