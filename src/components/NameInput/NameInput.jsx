import { FormErrorMessages } from '../FormErrorMessages/FormErrorMessages';
import css from './NameInput.module.css';
import { useId } from 'react';

export const NameInput = ({ placeholder, ariaLabel, errors, register, ...props }) => {
  const inputId = useId();

  return (
    <div className={css.container}>
      <input
        className={css.input}
        type="text"
        id={inputId}
        placeholder={placeholder}
        aria-label={ariaLabel}
        {...register("name", {
          required: "Required field",
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
          maxLength: {
            value: 32,
            message: "Name cannot exceed 32 characters",
          },
        })}
        {...props}
      />
      {errors?.name && (
        <FormErrorMessages>{errors.name.message}</FormErrorMessages>
      )}
    </div>
  );
};
