import { FormErrorMessages } from '../FormErrorMessages/FormErrorMessages';
import css from './PasswordInput.module.css';
import { useId, useState } from 'react';
import icons from '../../images/icons.svg';
import clsx from 'clsx';

export const PasswordInput = ({ placeholder, ariaLabel, required, errors, register, className, ...props }) => {
  const passwordInputId = useId();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowOrHidePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <label className={css.container} htmlFor={passwordInputId} >
        <input
          className={clsx(css.input, className)}
          type={showPassword ? 'text' : 'password'}
          id={passwordInputId}
          placeholder={placeholder}
          aria-label={ariaLabel}
          {...register('password', {
            required: required ? 'This field is required' : false,
            minLength: {
              value: 8,
              message: 'The password must be at least 8 characters',
            },
            maxLength: {
              value: 64,
              message: 'The password cannot exceed 64 characters',
            },
            validate: value =>
              !/\s/.test(value) || 'Password cannot contain spaces',
          })}
          {...props}
        />
        <button
          className={css.button}
          onClick={handleShowOrHidePassword}
          type="button"
          aria-label="Show the entered password"
        >
          <svg width={18} height={18}>
            <use className={showPassword ? css.iconShow : css.iconHide} href={`${icons}#icon-eye`}></use>
          </svg>
        </button>
      </label>
      {errors?.password && (
        <FormErrorMessages>{errors.password.message}</FormErrorMessages>
      )}
    </>
  );
};
