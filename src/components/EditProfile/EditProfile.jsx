import css from './EditProfile.module.css';

import { NameInput } from '../NameInput/NameInput.jsx';
import { EmailInput } from '../EmailInput/EmailInput.jsx';
import { PasswordInput } from '../PasswordInput/PasswordInput.jsx';
import { Button } from '../Button/Button.jsx';
import { useForm } from 'react-hook-form';

import icons from '../../images/icons.svg';
import avatar from '../../images/bg-mobile/abstraction.webp';
import { useEffect, useState } from 'react';
import user from '../../user.json';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/auth/operations.js'

export const EditProfile = () => {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(user);
  const {register, formState: { errors }, handleSubmit, setValue} = useForm(currentUser);
  const [updatedAvatar, setUpdatedAvatar] = useState(null);

  useEffect(() => {
    // запит на поточного юзера

    // записуємо юзера в стан
    setCurrentUser(user);

    // записуємо дані з бекенду в поля форми
    setValue('name', currentUser.name);
    setValue('email', currentUser.email);
    setValue('password', '');
  }, [setValue, currentUser]);


  const handleChange = (event) => {
    setUpdatedAvatar(event.target.file[0]);
  }


  const submitForm = data => {
    // Створення об'єкта для збереження змінених даних
    const changedData = {};

    // Перевірка полів форми на зміни порівняно з оригінальними даними користувача
    if (data.name !== currentUser.name) {
      changedData.name = data.name;
    }
    if (data.email !== currentUser.email) {
      changedData.email = data.email;
    }
    if (data.password) {
      changedData.password = data.password;
    }

    console.log(changedData);

    dispatch(updateUser(updatedAvatar));
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
            <input onChange={handleChange}
              className={css.input}
              type="file"
              aria-label="Add an avatar"
            />
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
          placeholder={'Enter a new password'}
          ariaLabel={'Enter a new password'}
          errors={errors}
          register={register}
        />
        <Button type={'submit'}>Send</Button>
      </form>
    </div>
  );
};
