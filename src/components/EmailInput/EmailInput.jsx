import clsx from 'clsx';
import { FormErrorMessages } from '../FormErrorMessages/FormErrorMessages';
import css from './EmailInput.module.css';
import { useId } from 'react';

export const EmailInput = ({ placeholder, ariaLabel, errors, register, className, ...props }) => {
  const inputId = useId();

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = (email) => {
    if (!emailPattern.test(email)) {
      return "Enter a valid email";
    }
  };

  return (
    <div className={css.container}>
      <input
        className={clsx(css.input, className)}
        type="email"
        id={inputId}
        placeholder={placeholder}
        aria-label={ariaLabel}
        {...register("email", {
          required: "This field is required",
          validate: validateEmail,
        })}
        {...props}
      />
      {errors?.email && <FormErrorMessages className={clsx(css.errorForm)}>{errors.email.message}</FormErrorMessages>}
    </div>
  );
};
