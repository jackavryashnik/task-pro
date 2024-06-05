import { FormErrorMessages } from '../FormErrorMessages/FormErrorMessages';
import css from './PasswordInput.module.css';
import { useId, useState } from 'react';

export const PasswordInput = ({ placeholder, ariaLabel, errors, register }) => {
  const passwordInputId = useId();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowOrHidePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={css.container}>
        <input
          className={css.input}
          type={showPassword ? "text" : "password"}
          id={passwordInputId}
          placeholder={placeholder}
          aria-label={ariaLabel}
          {...register("password", { required: "This field is required",
          minLength: {
            value: 8,
            message: "The password must be at least 8 characters"
          },
          maxLength: {
            value: 64,
            message: "The password cannot exceed 64 characters"
          },
          validate: value => !/\s/.test(value) || "Password cannot contain spaces",
        })}
        />
        <button
          className={css.button}
          onClick={handleShowOrHidePassword}
          type="button"
          aria-label="Show the entered password"
        >
          {showPassword ? "🙈" : "👀"}
        </button>
      </div>
      {errors?.password && <FormErrorMessages>{errors.password.message}</FormErrorMessages>}
    </>
  );
};
