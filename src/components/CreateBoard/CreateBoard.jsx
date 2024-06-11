import { useId, useState } from 'react';
import Icon from '../../images/icons.svg';
import css from './CreateBoard.module.css';
import { backgrounds } from '../../images/bgImages';
import { addBoard } from '../../redux/tasks/operations';

import { Button } from '../Button/Button';
import { useDispatch } from 'react-redux';

const icons = [
  '#icon-Project',
  '#icon-star',
  '#icon-loading',
  '#icon-puzzle',
  '#icon-container',
  '#icon-lightning-02',
  '#icon-colors-ovals',
  '#icon-hexagon',
];

export default function CreateBoard({ onClose }) {
  const dispatch = useDispatch();
  const inputIconId = useId();
  const inputBgId = useId();
  const [boardName, setBoardName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const [selectedBackground, setSelectedBackground] = useState(backgrounds[0]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      addBoard({
        name: boardName,
        icon: selectedIcon,
        background: selectedBackground,
      })
    );
    onClose();
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>New board</h2>

      <button className={css.btnClose} type="button" onClick={onClose}>
        <svg className={css.iconX} width={18} height={18}>
          <use href={`${Icon}#icon-x-close`}></use>
        </svg>
      </button>

      <input
        className={css.input}
        type="text"
        name="title"
        placeholder="Title"
        value={boardName}
        onChange={e => {
          setBoardName(e.target.value);
        }}
      />

      <h4 className={css.subheader}>Icons</h4>
      <ul className={css.iconList}>
        {icons.length > 0 &&
          icons.map((icon, index) => {
            return (
              <li className={css.iconItem} key={index}>
                <input
                  className={css.inputRadio}
                  type="radio"
                  name="icon"
                  value={icon}
                  onChange={() => setSelectedIcon(icon)}
                  checked={selectedIcon === icon}
                  id={inputIconId}
                />
                <label htmlFor={inputIconId} />
                <svg
                  className={selectedIcon === icon ? css.selected : css.icon}
                  width={18}
                  height={18}
                >
                  <use href={Icon + icon}></use>
                </svg>
              </li>
            );
          })}
      </ul>

      <h4 className={css.subheader}>Background</h4>
      <ul className={css.bgList}>
        {backgrounds.length > 0 &&
          backgrounds.map((bg, index) => {
            return (
              <li className={css.bgItem} key={index}>
                <input
                  className={css.inputRadio}
                  type="radio"
                  name="bg"
                  value={bg}
                  onChange={() => setSelectedBackground(bg)}
                  checked={selectedBackground === bg}
                  id={inputBgId}
                />
                <label htmlFor={inputBgId} />
                <picture>
                  <source srcSet={bg} media="(min-width: 375px)" />

                  <img
                    className={
                      selectedBackground === bg ? css.selectedBg : css.bg
                    }
                    src={bg}
                    alt="user select background for screenspage"
                  />
                </picture>
              </li>
            );
          })}
      </ul>
      <Button type="submit" onClick={handleSubmit} className={css.btnPlus}>
        <div className={css.svgBox}>
          <svg className={css.iconPlus}>
            <use href={`${Icon}#icon-plus`}></use>
          </svg>
        </div>
        <p className={css.text}>Create</p>
      </Button>
    </div>
  );
}
