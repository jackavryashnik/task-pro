import css from './EditProfile.module.css';

import { NameInput } from '../NameInput/NameInput.jsx';
import { EmailInput } from '../EmailInput/EmailInput.jsx';
import { PasswordInput } from '../PasswordInput/PasswordInput.jsx';
import { SubmitButton } from '../SubmitButton/SubmitButton.jsx';
import { useForm } from 'react-hook-form';

export const EditProfile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitForm = data => {
    console.log(data);
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit(submitForm)}>
        <div className={css.descriptionContainer}>
          <p>Edit profile</p>
          <button type="button">X</button>
        </div>
        <div className={css.avatarContainer}>
          <p>Profile picture</p>
          <button type="button">+</button>
        </div>

        <NameInput
          placeholder={'Ivetta'}
          ariaLabel={'Enter a new name'}
          errors={errors}
          register={register}
        />
        <EmailInput
          placeholder={'ivetta34@gmail.com'}
          ariaLabel={'Enter a new email'}
          errors={errors}
          register={register}
        />
        <PasswordInput
          placeholder={'ivetta1999.23'}
          ariaLabel={'Enter a new password'}
          errors={errors}
          register={register}
        />
        <SubmitButton>Send</SubmitButton>
      </form>
    </div>
  );
};
