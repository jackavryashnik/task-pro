import css from './EditProfile.module.css';
import icons from '../../images/icons.svg';
import avatar from '../../images/bg-mobile/abstraction.webp';

import { NameInput } from '../NameInput/NameInput.jsx';
import { EmailInput } from '../EmailInput/EmailInput.jsx';
import { PasswordInput } from '../PasswordInput/PasswordInput.jsx';
import { Button } from '../Button/Button.jsx';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../redux/auth/operations.js';

export const EditProfile = () => {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);
  const {register, formState: { errors }, handleSubmit, setValue} = useForm();
  const [file, setFile] = useState(null);
  const [isChangedInput, setIsChangedInput] = useState(true);
  const [changedInputData, setChangedInputData] = useState({name: false, email: false, password: false})

  // отримуємо дані користувача, записуємо їх в value інпутів
  useEffect(() => {
    const fetchData = async () => {
      const user = await dispatch(getCurrentUser());
      setCurrentUser(user.payload.data.user);
      console.log(user.payload.data.user);

      setValue('name', user.payload.data.user.name);
      setValue('email', user.payload.data.user.email);
      setValue('password', '');
    }
    fetchData();
  }, [dispatch, setValue])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log('Selected file:', selectedFile);
  }

  const handleInputChange = (event) => {
    const inputName = event.target.name
    const inputValue = event.target.value;

    if (!inputValue) {
      setIsChangedInput(true);
      setChangedInputData({
        ...changedInputData,
        [inputName]: false,
      });
    } else {
      if (currentUser[inputName] === inputValue) {
        setIsChangedInput(true);
        setChangedInputData({
          ...changedInputData,
          [inputName]: false,
        });
      } else {
        setIsChangedInput(false);
        setChangedInputData({
          ...changedInputData,
          [inputName]: true,
        });
      }
    }
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

        console.log(`form-data: ${data}`);
      } else {
        console.log(changedData);
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

        <div className={css.inputContainer}>
          <NameInput
            placeholder={currentUser ? currentUser.name : 'Enter a new name'}
            ariaLabel={'Enter a new name'}
            errors={errors}
            register={register}
            onChange={handleInputChange}
          />
          {changedInputData.name ? <span className={css.span}>*</span> : null}
        </div>
        <div className={css.inputContainer}>
          <EmailInput
            placeholder={currentUser ? currentUser.email : 'Enter a new email'}
            ariaLabel={'Enter a new email'}
            errors={errors}
            register={register}
            onChange={handleInputChange}
          />
          {changedInputData.email ? <span className={css.span}>*</span> : null}
        </div>
        <div className={css.inputContainer}>
          <PasswordInput
            placeholder={'Enter a new password'}
            ariaLabel={'Enter a new password'}
            required={false}
            errors={errors}
            register={register}
            onChange={handleInputChange}
          />
          {changedInputData.password ? <span className={css.span}>*</span> : null}
        </div>
        <Button type={'submit'} disabled={isChangedInput}>Send</Button>
      </form>
    </div>
  );
};


  // отримання даних юзера
  // const user = useSelector(selectUser);
  // console.log(user);

  // currentUser ? currentUser.name : 'Enter a new name'