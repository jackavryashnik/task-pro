import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => setCounter(counter - 1), 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  return (
    <div className={css.page}>
      
      <h2 className={css.subtitle}>
        Oops! The page you requested could not be found.
      </h2>
      <div className={css.titleContainer}>
        <h1 className={css.title}>
          4
          <img
            src={cactus}
            width={54 * 1.5}
            height={78 * 1.5}
            srcSet={`${cactus} 1x, ${cactus2x} 2x`}
            alt="Cactus"
            className={css.cactus}
          />
          4
        </h1>
      </div>
      <div className={css.home}>
        <p className={css.text}>
          But don&apos;t worry we&apos;ll get you back now.
        </p>
        <p className={css.counter}>{counter}</p>
      </div>
      {!counter && <Navigate to="/home" />}

      <Button
        className={css.button}
        type={'button'}
        onClick={() => setCounter(0)}
      >
        Go home now
      </Button>
    </div>
  );
};

export default NotFoundPage;
