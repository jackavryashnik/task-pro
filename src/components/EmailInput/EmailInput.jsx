import { FormErrorMessages } from '../FormErrorMessages/FormErrorMessages';
import css from './EmailInput.module.css';
import { useId } from 'react';

export const EmailInput = ({ placeholder, ariaLabel, errors, register }) => {
  const inputId = useId();

  return (
    <div className={css.container}>
      <input
        className={css.input}
        type="email"
        id={inputId}
        placeholder={placeholder}
        aria-label={ariaLabel}
        {...register("email", {
          required: "This field is required",
          pattern: {
            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
            message: "Enter a valid email",
          },
        })}
      />
      {errors?.email && <FormErrorMessages>{errors.email.message}</FormErrorMessages>}
    </div>
  );
};
