import css from './EditProfile.module.css';
import icons from '../../images/icons.svg';
import defaultAvatar from '../../images/user.jpg';
import defaultAvatar2x from '../../images/user@2x.jpg';

import { NameInput } from '../NameInput/NameInput.jsx';
import { EmailInput } from '../EmailInput/EmailInput.jsx';
import { PasswordInput } from '../PasswordInput/PasswordInput.jsx';
import { Button } from '../Button/Button.jsx';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';
import { updateUser } from '../../redux/auth/operations.js';
import { unwrapResult } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const EditProfile = ({ closeModal }) => {
  const dispatch = useDispatch();
  const currentDataUser = useSelector(selectUser);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const [file, setFile] = useState(null);
  const [isChangedInput, setIsChangedInput] = useState(true);
  const initialValues = { name: false, email: false, password: false };
  const [changedInputData, setChangedInputData] = useState(initialValues);

  // отримуємо дані користувача, записуємо їх в value інпутів
  useEffect(() => {
    if (currentDataUser) {
      setValue('name', currentDataUser.name);
      setValue('email', currentDataUser.email);
      setValue('password', '');

      console.log(currentDataUser);
    }
  }, [currentDataUser, setValue]);

  const handleFileChange = event => {
    setIsChangedInput(false);
    setChangedInputData(initialValues);

    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setIsChangedInput(false);
    }
  };

  // відслідковування змін в інпутах (додавання зірочки, disabled кнопки)
  const handleInputChange = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    // якщо рядок пустий
    if (inputValue === '') {
      setIsChangedInput(true);
      setChangedInputData({
        ...changedInputData,
        [inputName]: false,
      });
    } else {
      // якщо поле поточного користувача дорівнює полю форми
      if (currentDataUser[inputName] === inputValue) {
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
  };

  const submitForm = async data => {
    // Створення об'єкта для збереження змінених даних
    const changedData = {};

    // Перевірка полів форми на зміни порівняно з оригінальними даними користувача
    if (data.name !== currentDataUser.name) {
      changedData.name = data.name;
    }
    if (data.email !== currentDataUser.email) {
      changedData.email = data.email;
    }
    if (data.password) {
      changedData.password = data.password;
    }

    try {
      setIsChangedInput(false);
      setChangedInputData(initialValues);

      if (file) {
        const formData = new FormData();
        if (changedData.name) {
          formData.append('name', changedData.name);
        }

        if (changedData.email) {
          formData.append('email', changedData.email);
        }

        if (changedData.password) {
          formData.append('password', changedData.password);
        }

        formData.append('avatar', file);

        // відправка у форматі form-data
        const result = await dispatch(
          updateUser({ credentials: formData, isFormData: true })
        );
        unwrapResult(result);

        toast.success('Changed');

        setIsChangedInput(true);

        setTimeout(() => {
          closeModal();
        }, 500)

      } else {
        // відправка у форматі JSON
        const result = await dispatch(
          updateUser({ credentials: changedData, isFormData: false })
        );
        unwrapResult(result);

        toast.success('Changed');

        setIsChangedInput(true);

        setTimeout(() => {
          closeModal();
        }, 500)
      }
    } catch (error) {
      console.log(error);
      toast.error('Error! Try again');
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.descriptionContainer}>
          <h3 className={css.description}>Edit profile</h3>
          <button
            onClick={() => closeModal()}
            className={css.buttonClose}
            type="button"
            aria-label="Close"
          >
            <svg width={18} height={18}>
              <use href={`${icons}#icon-x-close`}></use>
            </svg>
          </button>
        </div>
        <form className={css.form} onSubmit={handleSubmit(submitForm)}>
          <div className={css.avatarContainer}>
            <img
              className={css.avatar}
              src={file ? URL.createObjectURL(file) : (currentDataUser.avatar ? currentDataUser.avatar : defaultAvatar)}
  srcSet={file ? `${URL.createObjectURL(file)} 1x, ${URL.createObjectURL(file)} 2x` : `${currentDataUser.avatar ? currentDataUser.avatar : defaultAvatar} 1x, ${currentDataUser.avatar ? currentDataUser.avatar : defaultAvatar2x} 2x`}
            />
            <label className={css.label}>
              <svg className={css.icon} width={10} height={10}>
                <use href={`${icons}#icon-plus`}></use>
              </svg>
              <input
                onChange={handleFileChange}
                className={css.input}
                type="file"
                aria-label="Add a new avatar"
              />
            </label>
          </div>

          <div className={css.inputContainer}>
            <NameInput
              placeholder={
                currentDataUser ? currentDataUser.name : 'Enter a new name'
              }
              ariaLabel={'Enter a new name'}
              errors={errors}
              register={register}
              className={css.color}
              onChange={handleInputChange}
            />
            {changedInputData.name ? <span className={css.span}>*</span> : null}
          </div>
          {currentDataUser.oauth ? null : <div className={css.inputContainer}>
            <EmailInput
              placeholder={
                currentDataUser ? currentDataUser.email : 'Enter a new email'
              }
              ariaLabel={'Enter a new email'}
              errors={errors}
              register={register}
              className={css.color}
              onChange={handleInputChange}
            />
            {changedInputData.email ? (
              <span className={css.span}>*</span>
            ) : null}
          </div>}
          {currentDataUser.oauth ? null : <div className={css.inputContainer}>
            <PasswordInput
              placeholder={'Enter a new password'}
              ariaLabel={'Enter a new password'}
              required={false}
              errors={errors}
              register={register}
              className={css.color}
              onChange={handleInputChange}
            />
            {changedInputData.password ? (
              <span className={css.span}>*</span>
            ) : null}
          </div>}
          <Button type={'submit'} disabled={isChangedInput}>
            Send
          </Button>
        </form>

        <div>
        </div>
      </div>
    </div>
  );
};

// oauth