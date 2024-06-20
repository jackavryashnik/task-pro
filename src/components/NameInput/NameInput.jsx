import clsx from 'clsx';
import { FormErrorMessages } from '../FormErrorMessages/FormErrorMessages';
import css from './NameInput.module.css';
import { useId } from 'react';

export const NameInput = ({
  placeholder,
  ariaLabel,
  errors,
  register,
  className,
  ...props
}) => {
  const inputId = useId();

  return (
    <div className={css.container}>
      <input
        className={clsx(css.input, className)}
        type="text"
        id={inputId}
        autoComplete="off"
        placeholder={placeholder}
        aria-label={ariaLabel}
        {...register('name', {
          required: 'Required field',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
          maxLength: {
            value: 32,
            message: 'Name cannot exceed 32 characters',
          },
          validate: value =>
            value.trim().length > 0 || "Name shouldn't be blank",
        })}
        {...props}
      />
      {errors?.name && (
        <FormErrorMessages className={clsx(css.errorForm)}>
          {errors.name.message}
        </FormErrorMessages>
      )}
    </div>
  );
};
