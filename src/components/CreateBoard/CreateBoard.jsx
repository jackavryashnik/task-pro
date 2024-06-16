import { useId, useState } from 'react';
import Icon from '../../images/icons.svg';
import css from './CreateBoard.module.css';
import {
  addBoard,
  editBoard,
  fetchOneBoard,
} from '../../redux/tasks/operations';
import { Button } from '../Button/Button';
import { useDispatch } from 'react-redux';
import { useTasks } from '../../redux/tasks/selectors';
import toast from 'react-hot-toast';

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

export default function CreateBoard({ onClose, isEdit, setIsEdit }) {
  const dispatch = useDispatch();
  const inputIconId = useId();
  const inputBgId = useId();
  const { selectedBoard, backgroundLogos } = useTasks();

  const [boardName, setBoardName] = useState(isEdit ? selectedBoard.name : '');

  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const [selectedBackground, setSelectedBackground] = useState({
    name: 'default',
    mini: `${Icon}#icon-background`,
  });

  const handleSubmitCreate = e => {
    e.preventDefault();
    if (!boardName) {
      return toast.success('Please write a title for the board');
    }
    dispatch(
      addBoard({
        name: boardName.trim(),
        icon: selectedIcon,
        background: selectedBackground.name,
      })
    )
      .unwrap()
      .then(createdBoard => {
        dispatch(fetchOneBoard(createdBoard.board.id));
        onClose();
      });
  };

  const handleSubmitEdit = e => {
    e.preventDefault();
    dispatch(
      editBoard({
        id: selectedBoard.id,
        name: boardName,
        icon: selectedIcon,
        background: selectedBackground.name,
      })
    );

    onClose();
  };

  const handleClick = () => {
    if (isEdit) {
      setIsEdit(true);
    }
    onClose();
  };

  return (
    <div className={css.container}>
      {isEdit ? (
        <h2 className={css.title}>Edit board</h2>
      ) : (
        <h2 className={css.title}>New board</h2>
      )}

      <button className={css.btnClose} type="button" onClick={handleClick}>
        <svg className={css.iconX} width={18} height={18}>
          <use href={`${Icon}#icon-x-close`}></use>
        </svg>
      </button>

      <input
        className={css.input}
        type="text"
        name="title"
        placeholder="Title"
        autoFocus
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
        <li className={css.bgItem}>
          <svg className={css.iconBg} width={28} height={28}>
            <use href={`${Icon}#icon-background`} />
          </svg>
          <input
            className={css.inputRadio}
            type="radio"
            name="bg"
            value="default"
            onChange={() =>
              setSelectedBackground({
                name: 'default',
                mini: `${Icon}#icon-background`,
              })
            }
            checked={selectedBackground.name === 'default'}
            id={inputBgId}
          />
          <label htmlFor={inputBgId} />
        </li>
        {backgroundLogos.length > 0 &&
          backgroundLogos.map((bg, index) => {
            return (
              <li className={css.bgItem} key={index}>
                <input
                  className={css.inputRadio}
                  type="radio"
                  name="bg"
                  value={bg.name}
                  onChange={() => setSelectedBackground(bg)}
                  checked={selectedBackground.name === bg.name}
                  id={inputBgId}
                />
                <label htmlFor={inputBgId} />

                <picture>
                  <source
                    srcSet={`${bg.mini2x} 2x`}
                    media="(min-width: 375px)"
                  />

                  <img
                    className={
                      selectedBackground.name === bg.name
                        ? css.selectedBg
                        : css.bg
                    }
                    src={bg.mini}
                    alt={bg.name}
                  />
                </picture>
              </li>
            );
          })}
      </ul>
      {isEdit ? (
        <Button
          type="submit"
          onClick={handleSubmitEdit}
          className={css.btnPlus}
        >
          <div className={css.svgBox}>
            <svg className={css.iconPlus}>
              <use href={`${Icon}#icon-plus`}></use>
            </svg>
          </div>

          <p className={css.text}>Edit</p>
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={handleSubmitCreate}
          className={css.btnPlus}
        >
          <div className={css.svgBox}>
            <svg className={css.iconPlus}>
              <use href={`${Icon}#icon-plus`}></use>
            </svg>
          </div>

          <p className={css.text}>Create</p>
        </Button>
      )}
    </div>
  );
}
