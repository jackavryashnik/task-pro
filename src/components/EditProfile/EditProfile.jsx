import css from './EditProfile.module.css';

import { NameInput } from '../NameInput/NameInput.jsx';
import { EmailInput } from '../EmailInput/EmailInput.jsx';
import { PasswordInput } from '../PasswordInput/PasswordInput.jsx';
import { Button } from '../Button/Button.jsx';
import { useForm } from 'react-hook-form';

import icons from '../../images/icons.svg';
import avatar from '../../images/bg-mobile/abstraction.webp';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
// import { updateUser } from '../../redux/auth/operations.js'
// import { selectUser } from '../../redux/auth/selectors.js'

import testUser from '../../user.json'

export const EditProfile = () => {
  const dispatch = useDispatch();

  // отримання даних юзера
  // const user = useSelector(selectUser);
  // console.log(user);


  const [currentUser, setCurrentUser] = useState(null);
  const {register, formState: { errors }, handleSubmit, setValue} = useForm();
  const [file, setFile] = useState(null);



  useEffect(() => {

    // записуємо юзера в стан
    setCurrentUser(testUser);
    console.log(currentUser);

    // записуємо дані юзера в поля форми
    setValue('name', currentUser.name);
    setValue('email', currentUser.email);
    setValue('password', '');
  }, [setValue, currentUser]);


  const handleFileChange = (event) => {
    setFile(event.target.file[0]);
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

    try {
      if (file) {
        const data = new FormData();
        if (changedData.name) {
          data.append('name', changedData.name)
        }

        if (changedData.email) {
          data.append('email', changedData.email)
        }

        if (changedData.password) {
          data.append('password', changedData.password)
        }

        data.append('file', file);
      }
    } catch (error) {
      console.log(error);
    }

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
            <input onChange={handleFileChange}
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
