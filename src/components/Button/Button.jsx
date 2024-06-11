import css from './Button.module.css';
import clsx from 'clsx';

export const Button = ({ className, type, children, onClick }) => {
  return (
    <button
      className={clsx(css.button, className)}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
