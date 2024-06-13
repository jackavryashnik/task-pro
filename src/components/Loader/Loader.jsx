import css from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={css.container}>
      <div className={css.tripleSpinner}></div>
    </div>
  );
};
