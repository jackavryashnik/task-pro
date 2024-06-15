import Column from '../Column/Column';
import css from './MainDashboard.module.css';
import { useTasks } from '../../redux/tasks/selectors';
import icons from '../../images/icons.svg';
import AddColumnModal from '../AddColumnModal/AddColumnModal';

import { Button } from '../Button/Button';
import CreateBoard from '../CreateBoard/CreateBoard';

const MainDashboard = ({ openModal, closeModal }) => {
  const { columns = [], boards } = useTasks();

  return (
    <div className={css.dashboard}>
      {boards.length > 0 ? (
        <div className={css.columns}>
          {columns.map(column => (
            <Column
              openModal={openModal}
              closeModal={closeModal}
              key={column.id}
              column={column}
              tasks={column.tasks}
            />
          ))}
           <Button className={css.addColumnButton} onClick={() => openModal(<AddColumnModal onClose={closeModal} />)}>
        <div className={css.iconPlus}>
          <svg width={14} height={14}>
            <use href={`${icons}#icon-plus`}></use>
          </svg>
        </div>
        Add another column</Button>
        </div>
      ) : (
        <div className={css.textContainer}>
          <p className={css.text}>
            Before starting your project, it is essential
            <span
              className={css.spanCreateBoard}
              onClick={() => openModal(<CreateBoard onClose={closeModal} />)}
            >
              to create a board
            </span>
            to visualize and track all the necessary tasks and milestones. This
            board serves as a powerful tool to organize the workflow and ensure
            effective collaboration among team members.
          </p>
        </div>
      )}
    </div>
  );
};

export default MainDashboard;



      //     );
      //   })}
      //   <Button className={css.addColumnButton} onClick={() => openModal(<AddColumnModal onClose={closeModal} />)}>
      //   <div className={css.iconPlus}>
      //     <svg width={14} height={14}>
      //       <use href={`${icons}#icon-plus`}></use>
      //     </svg>
      //   </div>
      //   Add another column</Button>
      // </div>

      // <button
      //       onClick={() => openModal(<AddColumnModal onClose={closeModal} />)}
      //       className={css.addColumnButton}
      //     >
      //       <div className={css.svgColumnBtn}>
      //         <svg className={css.addIcon} width={28} height={28}>
      //           <use href={`${icons}#icon-plus-with-border`}></use>
      //         </svg>
      //       </div>
      //       Add another column
      //     </button>