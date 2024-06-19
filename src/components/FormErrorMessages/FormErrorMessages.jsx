// import css from "./FormErrorMessages.module.css"

// export const FormErrorMessages = ({ children }) => {
//     return <p className={css.description}>{children}</p>
// }

import PropTypes from 'prop-types';
import css from './FormErrorMessages.module.css';

export const FormErrorMessages = ({ children, className }) => (
  <div className={`${css.errorMessage} ${className}`}>
    {children}
  </div>
);

FormErrorMessages.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
