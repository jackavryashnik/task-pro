import css from './EditProfile.module.css';

import { NameInput } from '../NameInput/NameInput.jsx';
import { EmailInput } from '../EmailInput/EmailInput.jsx';
import { PasswordInput } from '../PasswordInput/PasswordInput.jsx';
import { Button } from '../Button/Button.jsx';
import { useForm } from 'react-hook-form';

import icons from '../../images/icons.svg';
import avatar from '../../images/bg-mobile/abstraction.webp';

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
    <div className={css.container}>
      <div className={css.descriptionContainer}>
        <h3 className={css.description}>Edit profile</h3>
        <button className={css.buttonClose} type="button" aria-label="Close">
          <svg width={18} height={18}>
            <use href={`${icons}#icon-x-close`}></use>
          </svg>
        </button>
      </div>
      <form className={css.form} onSubmit={handleSubmit(submitForm)}>
        <div className={css.avatarContainer}>
          <img className={css.avatar} src={avatar} />
          <label className={css.label}>
            <svg className={css.icon} width={10} height={10}>
              <use href={`${icons}#icon-plus`}></use>
            </svg>
            <input className={css.input} type="file" aria-label="Add an avatar" />
          </label>
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
        <Button>Send</Button>
        <Button className={"test"}>
          <div className={css.iconContainer}>
            <span><svg className={css.icon} width={23} height={23}>
              <use href={`${icons}#icon-plus`}></use>
            </svg></span>Submit
          </div>
        </Button>
      </form>
    </div>
  );
};
